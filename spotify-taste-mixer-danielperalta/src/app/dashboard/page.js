'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { generatePlaylist, getUserProfile, createPlaylist, addTracksToPlaylist } from '@/lib/spotify';
import Header from '@/components/Header';
import GenreWidget from '@/components/widgets/GenreWidget';
import DecadeWidget from '@/components/widgets/DecadeWidget';
import PopularityWidget from '@/components/widgets/PopularityWidget';
import ArtistWidget from '@/components/widgets/ArtistWidget';
import TrackWidget from '@/components/widgets/TrackWidget';
import MoodWidget from '@/components/widgets/MoodWidget';
import PlaylistDisplay from '@/components/playlist/PlaylistDisplay';

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedDecades, setSelectedDecades] = useState([]);
  const [selectedPopularity, setSelectedPopularity] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [selectedMood, setSelectedMood] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      if (!await isAuthenticated()) {
        router.replace('/');
        return;
      }
      setLoading(false);
    };
    checkAuth();
  }, [router]);

  const handleGenerate = async () => {
    if (
      selectedGenres.length === 0 &&
      selectedArtists.length === 0 &&
      selectedTracks.length === 0
    ) {
      setError('Selecciona al menos un género, artista o canción.');
      return;
    }

    setError(null);
    setSuccessMsg(null);
    setGenerating(true);

    try {
      const tracks = await generatePlaylist({
        artists: selectedArtists,
        genres: selectedGenres,
        decades: selectedDecades,
        popularity: selectedPopularity.length === 2 ? selectedPopularity : null,
      });
      setPlaylist(tracks);
    } catch (e) {
      setError('Error al generar la playlist. Inténtalo de nuevo.');
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  const handleRemoveTrack = (trackId) => {
    setPlaylist(playlist.filter(t => t.id !== trackId));
  };

  const handleRefresh = async () => {
    await handleGenerate();
  };

  const handleSaveToSpotify = async () => {
  if (playlist.length === 0) return;

  setSaving(true);
  setError(null);
  setSuccessMsg(null);

  try {
    const newPlaylist = await createPlaylist(
      'Mi Taste Mixer Playlist',
      'Generada con Spotify Taste Mixer'
    );
    const trackUris = playlist.map(t => t.uri);
    await addTracksToPlaylist(newPlaylist.id, playlist);
    setSuccessMsg('¡Playlist guardada en tu cuenta de Spotify!');
  } catch (e) {
    setError('Error al guardar la playlist en Spotify.');
    console.error(e);
  } finally {
    setSaving(false);
  }
};

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#121212]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1DB954]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      <Header />
      <main className="p-6">
        <h2 className="text-white text-2xl font-bold mb-6">Dashboard</h2>

        <GenreWidget
          onSelect={setSelectedGenres}
          selectedItems={selectedGenres}
        />
        <DecadeWidget
          onSelect={setSelectedDecades}
          selectedItems={selectedDecades}
        />
        <PopularityWidget
          onSelect={setSelectedPopularity}
          selectedItems={selectedPopularity}
        />
        <ArtistWidget
          onSelect={setSelectedArtists}
          selectedItems={selectedArtists}
        />
        <TrackWidget
          onSelect={setSelectedTracks}
          selectedItems={selectedTracks}
        />
        <MoodWidget
          onSelect={setSelectedMood}
          selectedItems={selectedMood}
        />

        {error && <p className="text-red-500 mt-4">{error}</p>}
        {successMsg && <p className="text-green-500 mt-4">{successMsg}</p>}

        <button
          onClick={handleGenerate}
          disabled={generating}
          className="mt-6 bg-[#1DB954] text-black px-6 py-2 rounded-full font-bold hover:bg-[#1ed760] transition-colors"
        >
          {generating ? 'Generando...' : 'Generar Playlist'}
        </button>

        {playlist.length > 0 && (
          <>
            <button
              onClick={handleRefresh}
              disabled={generating}
              className="mt-2 ml-2 bg-[#282828] text-white px-6 py-2 rounded-full hover:bg-[#383838] transition-colors"
            >
              Refrescar
            </button>
            <button
              onClick={handleSaveToSpotify}
              disabled={saving}
              className="mt-2 ml-2 bg-[#282828] text-white px-6 py-2 rounded-full hover:bg-[#383838] transition-colors"
            >
              {saving ? 'Guardando...' : 'Guardar en Spotify'}
            </button>
          </>
        )}

        <PlaylistDisplay
          tracks={playlist}
          onRemove={handleRemoveTrack}
        />
      </main>
    </div>
  );
}