import { getAccessToken } from '@/lib/auth';

const BASE_URL = 'https://api.spotify.com/v1';

async function spotifyFetch(endpoint) {
  const token = await getAccessToken();

  if (!token) {
    throw new Error('No hay token de acceso');
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (response.status === 401) {
    throw new Error('Token expirado');
  }

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

export async function getUserProfile() {
  return spotifyFetch('/me');
}

export async function getTopTracks(limit = 20) {
  return spotifyFetch(`/me/top/tracks?limit=${limit}`);
}

export async function getTopArtists(limit = 10) {
  return spotifyFetch(`/me/top/artists?limit=${limit}`);
}

export async function searchTracks(query, limit = 10) {
  const q = encodeURIComponent(query);
  return spotifyFetch(`/search?type=track&q=${q}&limit=${limit}`);
}

export async function searchArtists(query, limit = 5) {
  const q = encodeURIComponent(query);
  return spotifyFetch(`/search?type=artist&q=${q}&limit=${limit}`);
}

export async function getArtistTopTracks(artistId) {
  return spotifyFetch(`/artists/${artistId}/top-tracks`);
}

export async function generatePlaylist(preferences) {
  const { artists, genres, decades, popularity } = preferences;
  const token = await getAccessToken();
  let allTracks = [];

  for (const artist of artists) {
    const tracks = await fetch(
      `https://api.spotify.com/v1/artists/${artist.id}/top-tracks?market=US`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    const data = await tracks.json();
    allTracks.push(...data.tracks);
  }

  for (const genre of genres) {
    const results = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=genre:${genre}&limit=10`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    const data = await results.json();
    if (data.tracks?.items) {
      allTracks.push(...data.tracks.items);
    }
  }


  if (decades.length > 0) {
    allTracks = allTracks.filter(track => {
      const year = new Date(track.album.release_date).getFullYear();
      return decades.some(decade => {
        const decadeStart = parseInt(decade);
        return year >= decadeStart && year < decadeStart + 10;
      });
    });
  }
  if (popularity && Array.isArray(popularity) && popularity.length === 2) {
  const [min, max] = popularity;
  allTracks = allTracks.filter(
    track => track.popularity === undefined || 
    (track.popularity >= min && track.popularity <= max)
  );
}

  const uniqueTracks = Array.from(
    new Map(allTracks.map(track => [track.id, track])).values()
  ).slice(0, 30);

  return uniqueTracks;
}