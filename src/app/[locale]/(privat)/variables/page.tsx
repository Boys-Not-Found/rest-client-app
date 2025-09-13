'use client';
import dynamic from 'next/dynamic';
import { useUserStore } from '@/store/userStore';
import Loader from '@/components/Loader/Loader';

const VariablesContent = dynamic(() => import('./VariablesContent'), {
  ssr: false,
  loading: () => <Loader />,
});

export default function VariablesPage() {
  const user = useUserStore((state) => state.user);

  return user && <VariablesContent />;
}
