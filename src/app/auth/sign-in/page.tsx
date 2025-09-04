'use client';

import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase/client';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { FirebaseError } from 'firebase/app';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
type FormData = z.infer<typeof schema>;

export default function SignInPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async ({ email, password }: FormData) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Signed in!');
      router.replace('/dashboard');
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        toast.error(err.message);
      } else {
        toast.error('Sign in failed');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Signed in with Google!');
      router.replace('/dashboard');
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        toast.error(err.message);
      } else {
        toast.error('Google sign in failed');
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-md">
        <h1 className="mb-6 text-2xl text-center font-semibold">Sign in</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-xl border border-gray-300 p-3 focus:border-black focus:ring-1 focus:ring-black outline-none"
              {...register('email')}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-xl border border-gray-300 p-3 focus:border-black focus:ring-1 focus:ring-black outline-none"
              {...register('password')}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <button
            disabled={isSubmitting}
            className="w-full rounded-xl bg-black p-3 text-white disabled:opacity-60 hover:bg-gray-800 transition-colors"
          >
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={handleGoogleSignIn}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 p-3 hover:bg-gray-100 transition-colors"
          >
            <FcGoogle className="text-xl" />
            <span>Sign in with Google</span>
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          No account?{' '}
          <a className="underline text-black" href="/auth/sign-up">
            Create one
          </a>
        </p>
      </div>
    </main>
  );
}
