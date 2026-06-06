'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import Header from '@/components/Header';

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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
        <h2 className="text-white text-2xl font-bold">Dashboard</h2>
        <p className="text-[#B3B3B3] mt-2">Aquí irán los widgets.</p>
      </main>
    </div>
  );
}