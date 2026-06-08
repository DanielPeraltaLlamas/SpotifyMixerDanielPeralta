'use client';

export default function PlaylistDisplay({ tracks, onRemove }) {
  if (!tracks || tracks.length === 0) {
    return (
      <div>
        <p>No hay canciones en la playlist. Selecciona preferencias y genera una playlist.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Tu Playlist ({tracks.length} canciones)</h2>
      {tracks.map((track, index) => (
        <div key={track.id}>
          <span>{index + 1}. {track.name} — {track.artists?.[0]?.name}</span>
          <button onClick={() => onRemove(track.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}