'use client';
import { useState } from 'react';

const GENRES = [
  'acoustic', 'afrobeat', 'alt-rock', 'alternative', 'ambient',
  'anime', 'black-metal', 'bluegrass', 'blues', 'bossanova',
  'brazil', 'breakbeat', 'british', 'cantopop', 'chicago-house',
  'children', 'chill', 'classical', 'club', 'comedy',
  'country', 'dance', 'dancehall', 'death-metal', 'deep-house',
  'detroit-techno', 'disco', 'disney', 'drum-and-bass', 'dub',
  'dubstep', 'edm', 'electro', 'electronic', 'emo',
  'folk', 'forro', 'french', 'funk', 'garage',
  'german', 'gospel', 'goth', 'grindcore', 'groove',
  'grunge', 'guitar', 'happy', 'hard-rock', 'hardcore',
  'hardstyle', 'heavy-metal', 'hip-hop', 'house', 'idm',
  'indian', 'indie', 'indie-pop', 'industrial', 'iranian',
  'j-dance', 'j-idol', 'j-pop', 'j-rock', 'jazz',
  'k-pop', 'kids', 'latin', 'latino', 'malay',
  'mandopop', 'metal', 'metal-misc', 'metalcore', 'minimal-techno',
  'movies', 'mpb', 'new-age', 'new-release', 'opera',
  'pagode', 'party', 'philippines-opm', 'piano', 'pop',
  'pop-film', 'post-dubstep', 'power-pop', 'progressive-house', 'psych-rock',
  'punk', 'punk-rock', 'r-n-b', 'rainy-day', 'reggae',
  'reggaeton', 'road-trip', 'rock', 'rock-n-roll', 'rockabilly',
  'romance', 'sad', 'salsa', 'samba', 'sertanejo',
  'show-tunes', 'singer-songwriter', 'ska', 'sleep', 'songwriter',
  'soul', 'soundtracks', 'spanish', 'study', 'summer',
  'swedish', 'synth-pop', 'tango', 'techno', 'trance',
  'trip-hop', 'turkish', 'work-out', 'world-music'
];

const MAX_GENRES = 5;

export default function GenreWidget({ onSelect, selectedItems = [] }) {
  const [search, setSearch] = useState('');

  const filtered = GENRES.filter(g => g.includes(search.toLowerCase()));

  const toggleGenre = (genre) => {
    if (selectedItems.includes(genre)) {
      onSelect(selectedItems.filter(g => g !== genre));
    } else {
      if (selectedItems.length >= MAX_GENRES) return;
      onSelect([...selectedItems, genre]);
    }
  };

  return (
    <div>
      <h2>Géneros</h2>
      <p>{selectedItems.length}/{MAX_GENRES} seleccionados</p>

      <input
        type="text"
        placeholder="Buscar género..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div>
        {filtered.map(genre => (
          <button
            key={genre}
            onClick={() => toggleGenre(genre)}
            disabled={!selectedItems.includes(genre) && selectedItems.length >= MAX_GENRES}
          >
            {selectedItems.includes(genre) ? '✓ ' : ''}{genre}
          </button>
        ))}
      </div>
    </div>
  );
}