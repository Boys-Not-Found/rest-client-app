'use client';
import dynamic from 'next/dynamic';
import { useUserStore } from '@/store/userStore';
import Loader from '@/components/Loader/Loader';

const RestClientContent = dynamic(() => import('./RestClientContent'), {
  ssr: false,
  loading: () => <Loader />,
});

export default function RestClientPage() {
  const user = useUserStore((state) => state.user);

  return user && <RestClientContent />;
}
