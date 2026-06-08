'use client';
import { useState, useEffect, useRef } from 'react';
import { searchTracks } from '@/lib/spotify';

const MAX_TRACKS = 5;

export default function TrackWidget({ onSelect, selectedItems = [] }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await searchTracks(query);
        setResults(data.tracks.items);
      } catch (e) {
        console.error('Error buscando tracks:', e);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const toggleTrack = (track) => {
    const isSelected = selectedItems.find(t => t.id === track.id);
    if (isSelected) {
      onSelect(selectedItems.filter(t => t.id !== track.id));
    } else {
      if (selectedItems.length >= MAX_TRACKS) return;
      onSelect([...selectedItems, {
        id: track.id,
        name: track.name,
        artist: track.artists[0].name
      }]);
    }
  };

  const isSelected = (track) => selectedItems.some(t => t.id === track.id);

  return (
    <div>
      <h2>Canciones</h2>
      <p>{selectedItems.length}/{MAX_TRACKS} seleccionadas</p>

      <input
        type="text"
        placeholder="Buscar canción..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      {loading && <p>Buscando...</p>}

      {results.length > 0 && (
        <div>
          {results.map(track => (
            <button
              key={track.id}
              onClick={() => toggleTrack(track)}
              disabled={!isSelected(track) && selectedItems.length >= MAX_TRACKS}
            >
              {isSelected(track) ? '✓ ' : ''}{track.name} — {track.artists[0].name}
            </button>
          ))}
        </div>
      )}

      {selectedItems.length > 0 && (
        <div>
          <p>Seleccionadas:</p>
          {selectedItems.map(track => (
            <button key={track.id} onClick={() => toggleTrack(track)}>
              ✕ {track.name} — {track.artist}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}