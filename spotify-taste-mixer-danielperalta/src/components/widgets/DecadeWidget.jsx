'use client';

const DECADES = [
  { label: '50s', value: '1950' },
  { label: '60s', value: '1960' },
  { label: '70s', value: '1970' },
  { label: '80s', value: '1980' },
  { label: '90s', value: '1990' },
  { label: '00s', value: '2000' },
  { label: '10s', value: '2010' },
  { label: '20s', value: '2020' },
];

export default function DecadeWidget({ onSelect, selectedItems = [] }) {
  const toggleDecade = (value) => {
    if (selectedItems.includes(value)) {
      onSelect(selectedItems.filter(d => d !== value));
    } else {
      onSelect([...selectedItems, value]);
    }
  };

  return (
    <div>
      <h2>Décadas</h2>
      <p>{selectedItems.length} seleccionadas</p>

      <div>
        {DECADES.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => toggleDecade(value)}
          >
            {selectedItems.includes(value) ? '✓ ' : ''}{label}
          </button>
        ))}
      </div>
    </div>
  );
}