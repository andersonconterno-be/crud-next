'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Usuario {
  id: string;
  name: string;
  email: string;
  course: string;
  semester: number;
  phone: string;
}

export default function UsuariosPage() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  // --- Modal de edição ---
  const [modalAberto, setModalAberto] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editCourse, setEditCourse] = useState('');
  const [editSemester, setEditSemester] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [erroModal, setErroModal] = useState('');

  function getToken() {
    return localStorage.getItem('token');
  }

  async function getUsers() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.json();
  }

  useEffect(() => {
    getUsers().then((data) => setUsuarios(data));
  }, []);

  // --- Logout ---
  function handleLogout() {
    localStorage.removeItem('token');
    router.push('/login');
  }

  // --- Excluir ---
  async function handleExcluir(id: string) {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) return;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );

    if (response.ok || response.status === 204) {
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    }
  }

  // --- Abrir modal de edição ---
  function handleAbrirModal(usuario: Usuario) {
    setUsuarioEditando(usuario);
    setEditName(usuario.name);
    setEditEmail(usuario.email);
    setEditCourse(usuario.course);
    setEditSemester(String(usuario.semester));
    setEditPhone(usuario.phone);
    setErroModal('');
    setModalAberto(true);
  }

  function handleFecharModal() {
    setModalAberto(false);
    setUsuarioEditando(null);
  }

  // --- Salvar edição ---
  async function handleSalvarEdicao(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!usuarioEditando) return;

    setErroModal('');

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${usuarioEditando.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({
            name: editName,
            email: editEmail,
            course: editCourse,
            semester: Number(editSemester),
            phone: editPhone,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao atualizar usuário');
      }

      setUsuarios((prev) =>
        prev.map((u) =>
          u.id === usuarioEditando.id
            ? {
                ...u,
                name: editName,
                email: editEmail,
                course: editCourse,
                semester: Number(editSemester),
                phone: editPhone,
              }
            : u
        )
      );

      handleFecharModal();
    } catch (error) {
      setErroModal(
        error instanceof Error ? error.message : 'Erro ao atualizar usuário'
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#f0E1D1] px-4 py-8">
      <div className="mx-auto w-full max-w-5xl rounded-4xl bg-white/95 p-6 shadow-2xl shadow-[#0E1A27]/10 border border-[#26436C]/10 backdrop-blur-sm">
        <header className="mb-6 flex flex-col gap-4 rounded-3xl bg-[#0E1A27] p-5 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Lista de Usuários</h1>
            <p className="mt-1 text-sm text-[#D9E4F2]">
              Gerencie seus usuários, edite registros ou exclua o que não for mais necessário.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center rounded-xl bg-[#f0E1D1] px-5 py-3 text-sm font-bold text-[#0E1A27] transition-all hover:bg-[#e2ceba] hover:shadow-lg hover:shadow-[#0E1A27]/10 active:scale-[0.98]"
          >
            Logout
          </button>
        </header>

        <div className="space-y-4">
          {usuarios.map((usuario) => (
            <div
              key={usuario.id}
              className="rounded-3xl border border-[#26436C]/10 bg-[#f8f4ef] p-5 shadow-sm shadow-[#0E1A27]/5 transition-transform hover:-translate-y-0.5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-[#0E1A27]">{usuario.name}</h2>
                  <p className="text-sm text-[#26436C]">{usuario.email}</p>
                  <div className="mt-1 flex flex-wrap gap-3 text-xs text-[#26436C]/70">
                    <span>{usuario.course}</span>
                    <span>·</span>
                    <span>{usuario.semester}º semestre</span>
                    <span>·</span>
                    <span>{usuario.phone}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleAbrirModal(usuario)}
                    className="rounded-xl border border-[#0E1A27]/15 bg-[#0E1A27]/5 px-4 py-2 text-sm font-semibold text-[#0E1A27] transition hover:bg-[#0E1A27]/10"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleExcluir(usuario.id)}
                    className="rounded-xl bg-[#d9534f] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#c9302c]"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de edição */}
      {modalAberto && usuarioEditando && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0E1A27]/60 p-4 backdrop-blur-sm"
          onClick={handleFecharModal}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-1 text-2xl font-bold text-[#0E1A27]">Editar Usuário</h2>
            <p className="mb-6 text-sm text-[#26436C]">Atualize as informações do usuário abaixo.</p>

            <form className="space-y-4" onSubmit={handleSalvarEdicao}>
              <div>
                <label htmlFor="edit-nome" className="mb-1.5 block text-sm font-semibold text-[#0E1A27]">
                  Nome
                </label>
                <input
                  id="edit-nome"
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full rounded-xl border border-[#26436C]/20 bg-[#f0E1D1]/30 px-4 py-3 text-[#0E1A27] outline-none transition-all focus:border-[#26436C] focus:ring-2 focus:ring-[#26436C]/20"
                  required
                />
              </div>

              <div>
                <label htmlFor="edit-email" className="mb-1.5 block text-sm font-semibold text-[#0E1A27]">
                  E-mail
                </label>
                <input
                  id="edit-email"
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full rounded-xl border border-[#26436C]/20 bg-[#f0E1D1]/30 px-4 py-3 text-[#0E1A27] outline-none transition-all focus:border-[#26436C] focus:ring-2 focus:ring-[#26436C]/20"
                  required
                />
              </div>

              <div>
                <label htmlFor="edit-curso" className="mb-1.5 block text-sm font-semibold text-[#0E1A27]">
                  Curso
                </label>
                <input
                  id="edit-curso"
                  type="text"
                  value={editCourse}
                  onChange={(e) => setEditCourse(e.target.value)}
                  className="w-full rounded-xl border border-[#26436C]/20 bg-[#f0E1D1]/30 px-4 py-3 text-[#0E1A27] outline-none transition-all focus:border-[#26436C] focus:ring-2 focus:ring-[#26436C]/20"
                  required
                />
              </div>

              <div>
                <label htmlFor="edit-semestre" className="mb-1.5 block text-sm font-semibold text-[#0E1A27]">
                  Semestre
                </label>
                <input
                  id="edit-semestre"
                  type="number"
                  min={1}
                  value={editSemester}
                  onChange={(e) => setEditSemester(e.target.value)}
                  className="w-full rounded-xl border border-[#26436C]/20 bg-[#f0E1D1]/30 px-4 py-3 text-[#0E1A27] outline-none transition-all focus:border-[#26436C] focus:ring-2 focus:ring-[#26436C]/20"
                  required
                />
              </div>

              <div>
                <label htmlFor="edit-telefone" className="mb-1.5 block text-sm font-semibold text-[#0E1A27]">
                  Telefone
                </label>
                <input
                  id="edit-telefone"
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full rounded-xl border border-[#26436C]/20 bg-[#f0E1D1]/30 px-4 py-3 text-[#0E1A27] outline-none transition-all focus:border-[#26436C] focus:ring-2 focus:ring-[#26436C]/20"
                  required
                />
              </div>

              {erroModal && (
                <p className="text-center text-sm font-medium text-red-500">{erroModal}</p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleFecharModal}
                  className="flex-1 rounded-xl border border-[#26436C]/20 px-4 py-3 text-sm font-bold text-[#0E1A27] transition hover:bg-[#f0E1D1]/50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-[#0E1A27] px-4 py-3 text-sm font-bold text-[#f0E1D1] transition hover:bg-[#26436C] hover:shadow-lg hover:shadow-[#0E1A27]/20 active:scale-[0.98]"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
