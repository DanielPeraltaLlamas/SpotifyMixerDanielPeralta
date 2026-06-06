'use client';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/auth';

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-[#181818] border-b border-[#282828]">
      <h1 className="text-white font-bold text-xl">Spotify Taste Mixer</h1>
      <button
        onClick={handleLogout}
        className="text-[#B3B3B3] hover:text-white text-sm transition-colors"
      >
        Cerrar sesión
      </button>
    </header>
  );
}