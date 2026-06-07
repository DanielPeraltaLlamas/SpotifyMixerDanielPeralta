const MOODS = [
  { label: 'Happy', emoji: '😊', genre: 'happy' },
  { label: 'Sad', emoji: '😢', genre: 'sad' },
  { label: 'Energetic', emoji: '⚡', genre: 'work-out' },
  { label: 'Calm', emoji: '😌', genre: 'chill' },
  { label: 'Party', emoji: '🎉', genre: 'party' },
];

export default function MoodWidget({ onSelect, selectedItems = [] }) {
  const toggleMood = (genre) => {
    if (selectedItems.includes(genre)) {
      onSelect(selectedItems.filter(m => m !== genre));
    } else {
      onSelect([...selectedItems, genre]);
    }
  };

  return (
    <div>
      <h2>Mood</h2>
      <p>{selectedItems.length} seleccionados</p>

      <div>
        {MOODS.map(({ label, emoji, genre }) => (
          <button
            key={genre}
            onClick={() => toggleMood(genre)}
          >
            {selectedItems.includes(genre) ? '✓ ' : ''}{emoji} {label}
          </button>
        ))}
      </div>
    </div>
  );
}