'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setErro('');

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao realizar login');
      }

      localStorage.setItem(
        'token',
        data.access_token
      );

      router.push('/usuarios');
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : 'Erro ao realizar login'
      );
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0E1D1] p-4">
      <div className="w-full max-w-md rounded-2xl bg-white/95 p-8 shadow-2xl shadow-[#0E1A27]/10 border border-[#26436C]/10 backdrop-blur-sm">

        <h1 className="mb-2 text-center text-3xl font-bold text-[#0E1A27]">
          Login
        </h1>

        <p className="mb-8 text-center text-sm font-medium text-[#26436C]">
          Bem-vindo de volta! Por favor, insira seus dados.
        </p>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-semibold text-[#0E1A27]"
            >
              E-mail
            </label>

            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-[#26436C]/20 bg-[#f0E1D1]/30 px-4 py-3 text-[#0E1A27] placeholder-[#26436C]/50 outline-none transition-all focus:border-[#26436C] focus:ring-2 focus:ring-[#26436C]/20"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-semibold text-[#0E1A27]"
            >
              Senha
            </label>

            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-[#26436C]/20 bg-[#f0E1D1]/30 px-4 py-3 text-[#0E1A27] placeholder-[#26436C]/50 outline-none transition-all focus:border-[#26436C] focus:ring-2 focus:ring-[#26436C]/20"
              required
            />
          </div>

          {erro && (
            <p className="text-sm font-medium text-red-600">
              {erro}
            </p>
          )}

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 font-medium text-[#26436C] cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-[#26436C]/30 text-[#0E1A27] focus:ring-[#0E1A27]"
              />
              Lembrar de mim
            </label>

            <a
              href="#"
              className="font-semibold text-[#26436C] hover:text-[#0E1A27] transition-colors"
            >
              Esqueceu a senha?
            </a>
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-[#0E1A27] px-4 py-3.5 text-base font-bold text-[#f0E1D1] transition-all hover:bg-[#26436C] hover:shadow-lg hover:shadow-[#0E1A27]/20 active:scale-[0.98]"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}