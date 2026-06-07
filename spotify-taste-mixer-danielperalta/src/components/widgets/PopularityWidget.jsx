'use client';

const POPULARITY_PRESETS = [
  { label: 'Mainstream', description: 'Lo más escuchado', min: 80, max: 100 },
  { label: 'Popular', description: 'Conocido pero no masivo', min: 50, max: 80 },
  { label: 'Underground', description: 'Joyas ocultas', min: 0, max: 50 },
];

export default function PopularityWidget({ onSelect, selectedItems }) {
  const togglePreset = (preset) => {
    if (
      selectedItems &&
      selectedItems[0] === preset.min &&
      selectedItems[1] === preset.max
    ) {
      onSelect(null);
    } else {
      onSelect([preset.min, preset.max]);
    }
  };

  const isSelected = (preset) =>
    selectedItems &&
    selectedItems[0] === preset.min &&
    selectedItems[1] === preset.max;

  return (
    <div>
      <h2>Popularidad</h2>

      <div>
        {POPULARITY_PRESETS.map((preset) => (
          <button
            key={preset.label}
            onClick={() => togglePreset(preset)}
          >
            {isSelected(preset) ? '✓ ' : ''}{preset.label} — {preset.description}
          </button>
        ))}
      </div>
    </div>
  );
}