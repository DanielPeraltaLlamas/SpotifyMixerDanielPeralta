'use client';
import TrackCard from './TrackCard';

export default function PlaylistDisplay({ tracks, onRemove }) {
  if (!tracks || tracks.length === 0) {
    return (
      <div className="mt-6">
        <p className="text-[#B3B3B3]">No hay canciones en la playlist. Selecciona preferencias y genera una playlist.</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-white text-xl font-bold mb-4">
        Tu Playlist ({tracks.length} canciones)
      </h2>
      {tracks.map((track, index) => (
        <TrackCard
          key={track.id}
          track={track}
          index={index}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}