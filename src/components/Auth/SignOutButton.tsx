'use client';

import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { useRouter } from 'next/navigation';

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.replace('/auth/sign-in');
  };

  return (
    <button
      onClick={handleSignOut}
      className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
    >
      Sign Out
    </button>
  );
}
