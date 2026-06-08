'use client';
import { useState, useEffect } from 'react';

export default function TrackCard({ track, onRemove }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorite_tracks') || '[]');
    setIsFavorite(favorites.some(f => f.id === track.id));
  }, [track.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorite_tracks') || '[]');
    const isCurrentlyFavorite = favorites.some(f => f.id === track.id);

    if (isCurrentlyFavorite) {
      const updated = favorites.filter(f => f.id !== track.id);
      localStorage.setItem('favorite_tracks', JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      favorites.push(track);
      localStorage.setItem('favorite_tracks', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  return (
    <div className="flex items-center justify-between py-2 border-b border-[#282828]">
      <span className="text-white">
        {track.name} — {track.artists?.[0]?.name}
      </span>
      <div className="flex gap-2">
        <button
          onClick={toggleFavorite}
          className={isFavorite ? 'text-yellow-400' : 'text-[#B3B3B3]'}
        >
          {isFavorite ? '★' : '☆'}
        </button>
        <button
          onClick={() => onRemove(track.id)}
          className="text-red-500 hover:text-red-400 text-sm"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}