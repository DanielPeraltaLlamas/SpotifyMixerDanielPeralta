'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import Header from '@/components/Header';
import GenreWidget from '@/components/widgets/GenreWidget';
import DecadeWidget from '@/components/widgets/DecadeWidget';
import PopularityWidget from '@/components/widgets/PopularityWidget';
import MoodWidget from '@/components/widgets/MoodWidget';

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedDecades, setSelectedDecades] = useState([]);
  const [selectedPopularity, setSelectedPopularity] = useState(null);
  const [selectedMoods, setSelectedMoods] = useState([]);

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
        <MoodWidget
          onSelect={setSelectedMoods}
          selectedItems={selectedMoods}
        />
        <div className="mt-4 text-white">
          <p>Géneros: {selectedGenres.join(', ') || 'ninguno'}</p>
          <p>Décadas: {selectedDecades.join(', ') || 'ninguna'}</p>
          <p>Popularidad: {selectedPopularity ? `${selectedPopularity[0]}-${selectedPopularity[1]}` : 'ninguna'}</p>
          <p>Moods: {selectedMoods.join(', ') || 'ninguno'}</p>
        </div>
      </main>
    </div>
  );
}