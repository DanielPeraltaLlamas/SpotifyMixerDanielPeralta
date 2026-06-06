'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getSpotifyAuthUrl } from '@/lib/auth';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      if (await isAuthenticated()) {
        router.replace('/dashboard');
      }
    };
    checkAuth();
  }, [router]);

  const handleLogin = () => {
    window.location.href = getSpotifyAuthUrl();
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">Spotify Taste Mixer</h1>
      <button onClick={handleLogin} className="px-4 py-2 rounded-md border text-lg">
        Login con Spotify
      </button>
    </main>
  );
}