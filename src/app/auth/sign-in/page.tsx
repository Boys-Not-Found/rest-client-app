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
    <main className="mx-auto max-w-sm p-6">
      <h1 className="mb-4 text-2xl text-center font-semibold">Sign in</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl border p-3"
            {...register('email')}
          />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border p-3"
            {...register('password')}
          />
          {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
        </div>
        <button
          disabled={isSubmitting}
          className="w-full rounded-xl bg-black p-3 text-white disabled:opacity-60 cursor-pointer"
        >
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleGoogleSignIn}
          className="flex w-full items-center justify-center gap-2 rounded-xl border p-3 hover:bg-gray-50"
        >
          <FcGoogle className="text-xl" />
          <span>Sign in with Google</span>
        </button>
      </div>

      <p className="mt-4 text-sm">
        No account?{' '}
        <a className="underline" href="/auth/sign-up">
          Create one
        </a>
      </p>
    </main>
  );
}
