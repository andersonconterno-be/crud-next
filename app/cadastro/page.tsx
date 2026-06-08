'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('');
  const [phone, setPhone] = useState('');
  const [erro, setErro] = useState('');

  async function handleCadastro(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErro('');

    if (password !== confirmPassword) {
      setErro('As senhas não coincidem');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password,
            course,
            semester: Number(semester),
            phone,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao realizar cadastro');
      }

      router.push('/login');
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : 'Erro ao realizar cadastro'
      );
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0E1D1] p-4">
      <div className="w-full max-w-md rounded-2xl bg-white/95 p-8 shadow-2xl shadow-[#0E1A27]/10 border border-[#26436C]/10 backdrop-blur-sm">
        
        <h1 className="mb-2 text-center text-3xl font-bold text-[#0E1A27]">
          Cadastro
        </h1>
        <p className="mb-8 text-center text-sm font-medium text-[#26436C]">
          Cadastre-se e faça parte da nossa linda lista de usuários!
        </p>

        <form className="space-y-5" onSubmit={handleCadastro}>
          <div>
            <label 
              htmlFor="nome" 
              className="mb-1.5 block text-sm font-semibold text-[#0E1A27]"
            >
              Nome
            </label>
            <input
              id="nome"
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-[#26436C]/20 bg-[#f0E1D1]/30 px-4 py-3 text-[#0E1A27] placeholder-[#26436C]/50 outline-none transition-all focus:border-[#26436C] focus:ring-2 focus:ring-[#26436C]/20"
              required
            />
          </div>

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
              htmlFor="curso" 
              className="mb-1.5 block text-sm font-semibold text-[#0E1A27]"
            >
              Curso
            </label>
            <input
              id="curso"
              type="text"
              placeholder="Seu curso"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full rounded-xl border border-[#26436C]/20 bg-[#f0E1D1]/30 px-4 py-3 text-[#0E1A27] placeholder-[#26436C]/50 outline-none transition-all focus:border-[#26436C] focus:ring-2 focus:ring-[#26436C]/20"
              required
            />
          </div>

          <div>
            <label 
              htmlFor="semestre" 
              className="mb-1.5 block text-sm font-semibold text-[#0E1A27]"
            >
              Semestre
            </label>
            <input
              id="semestre"
              type="number"
              placeholder="Semestre atual"
              min={1}
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full rounded-xl border border-[#26436C]/20 bg-[#f0E1D1]/30 px-4 py-3 text-[#0E1A27] placeholder-[#26436C]/50 outline-none transition-all focus:border-[#26436C] focus:ring-2 focus:ring-[#26436C]/20"
              required
            />
          </div>

          <div>
            <label 
              htmlFor="telefone" 
              className="mb-1.5 block text-sm font-semibold text-[#0E1A27]"
            >
              Telefone
            </label>
            <input
              id="telefone"
              type="tel"
              placeholder="(00) 00000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-[#26436C]/20 bg-[#f0E1D1]/30 px-4 py-3 text-[#0E1A27] placeholder-[#26436C]/50 outline-none transition-all focus:border-[#26436C] focus:ring-2 focus:ring-[#26436C]/20"
              required
            />
          </div>

          <div>
            <label htmlFor="password" 
              className="mb-1.5 block text-sm font-semibold text-[#0E1A27]"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-[#26436C]/20 bg-[#f0E1D1]/30 px-4 py-3 text-[#0E1A27] placeholder-[#26436C]/50 outline-none transition-all focus:border-[#26436C] focus:ring-2 focus:ring-[#26436C]/20"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" 
              className="mb-1.5 block text-sm font-semibold text-[#0E1A27]"
            >
              Confirmar Senha
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder=""
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl border border-[#26436C]/20 bg-[#f0E1D1]/30 px-4 py-3 text-[#0E1A27] placeholder-[#26436C]/50 outline-none transition-all focus:border-[#26436C] focus:ring-2 focus:ring-[#26436C]/20"
              required
            />
          </div>

          {erro && (
            <p className="text-center text-sm font-medium text-red-500">{erro}</p>
          )}


          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-[#0E1A27] px-4 py-3.5 text-base font-bold text-[#f0E1D1] transition-all hover:bg-[#26436C] hover:shadow-lg hover:shadow-[#0E1A27]/20 active:scale-[0.98]"
          >
            Cadastrar
          </button>
        </form>

      </div>
    </div>
  );
}