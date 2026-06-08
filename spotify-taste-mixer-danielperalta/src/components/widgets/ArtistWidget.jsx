'use client';
import { useState, useEffect, useRef } from 'react';
import { searchArtists } from '@/lib/spotify';

const MAX_ARTISTS = 5;

export default function ArtistWidget({ onSelect, selectedItems = [] }) {
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
        const data = await searchArtists(query);
        setResults(data.artists.items);
      } catch (e) {
        console.error('Error buscando artistas:', e);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const toggleArtist = (artist) => {
    const isSelected = selectedItems.find(a => a.id === artist.id);
    if (isSelected) {
      onSelect(selectedItems.filter(a => a.id !== artist.id));
    } else {
      if (selectedItems.length >= MAX_ARTISTS) return;
      onSelect([...selectedItems, { id: artist.id, name: artist.name }]);
    }
  };

  const isSelected = (artist) => selectedItems.some(a => a.id === artist.id);

  return (
    <div>
      <h2>Artistas</h2>
      <p>{selectedItems.length}/{MAX_ARTISTS} seleccionados</p>

      <input
        type="text"
        placeholder="Buscar artista..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      {loading && <p>Buscando...</p>}

      {results.length > 0 && (
        <div>
          {results.map(artist => (
            <button
              key={artist.id}
              onClick={() => toggleArtist(artist)}
              disabled={!isSelected(artist) && selectedItems.length >= MAX_ARTISTS}
            >
              {isSelected(artist) ? '✓ ' : ''}{artist.name}
            </button>
          ))}
        </div>
      )}

      {selectedItems.length > 0 && (
        <div>
          <p>Seleccionados:</p>
          {selectedItems.map(artist => (
            <button key={artist.id} onClick={() => toggleArtist(artist)}>
              ✕ {artist.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}