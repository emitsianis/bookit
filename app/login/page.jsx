'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import createSession from '@/app/actions/createSession';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [state, formAction] = React.useActionState(createSession, {});
  const router = useRouter();

  useEffect(() => {
    if (state?.error) {
      toast(state.error, { type: 'error' });
    } else if (state?.success) {
      toast('Login successful!', { type: 'success' });
      router.push('/');
    }
  }, [state]);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm mt-20">
        <form action={formAction}>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Login
          </h2>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2"
            >Email</label
            >
            <input
              type="email"
              id="email"
              name="email"
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2"
            >Password</label
            >
            <input
              type="password"
              id="password"
              name="password"
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>

          <div className="flex flex-col gap-5">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>

            <p>
              No account?
              <Link href="/register" className="text-blue-500">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;