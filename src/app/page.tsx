import Link from 'next/link';

export default function Home() {
  return (
    <main className="grid min-h-screen place-items-center p-8 font-sans">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold">Welcome to REST Client App</h1>
        <p className="text-gray-600">Sign in to access your dashboard</p>
        <div className="flex justify-center gap-4">
          <Link
            href="/auth/sign-in"
            className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Sign in
          </Link>
          <Link href="/auth/sign-up" className="rounded-lg border px-4 py-2 hover:bg-gray-100">
            Sign up
          </Link>
        </div>
      </div>
    </main>
  );
}
