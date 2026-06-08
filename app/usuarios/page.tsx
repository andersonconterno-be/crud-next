
'use client';

import { useEffect, useState } from 'react';

export default function UsuariosPage() {
  
  const token = localStorage.getItem('token');
  const [usuarios, setUsuarios] = useState([]);

    async function getUsers() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.json();
    }

    useEffect(() => {
      getUsers().then((data) => setUsuarios(data));
    }, []);

  return (
    <div className="min-h-screen bg-[#f0E1D1] px-4 py-8">
      <div className="mx-auto w-full max-w-5xl rounded-4xl bg-white/95 p-6 shadow-2xl shadow-[#0E1A27]/10 border border-[#26436C]/10 backdrop-blur-sm">
        <header className="mb-6 flex flex-col gap-4 rounded-3xl bg-[#0E1A27] p-5 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Lista de Usuários</h1>
            <p className="mt-1 text-sm text-[#D9E4F2]">Gerencie seus usuários, edite registros ou exclua o que não for mais necessário.</p>
          </div>
          <button className="inline-flex items-center justify-center rounded-xl bg-[#f0E1D1] px-5 py-3 text-sm font-bold text-[#0E1A27] transition-all hover:bg-[#e2ceba] hover:shadow-lg hover:shadow-[#0E1A27]/10 active:scale-[0.98]">
            Logout
          </button>
        </header>

        <div className="space-y-4">
          {usuarios.map((usuario) => (
            <div key={usuario.id} className="rounded-3xl border border-[#26436C]/10 bg-[#f8f4ef] p-5 shadow-sm shadow-[#0E1A27]/5 transition-transform hover:-translate-y-0.5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-[#0E1A27]">{usuario.name}</h2>
                  <p className="text-sm text-[#26436C]">{usuario.email}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button className="rounded-xl border border-[#0E1A27]/15 bg-[#0E1A27]/5 px-4 py-2 text-sm font-semibold text-[#0E1A27] transition hover:bg-[#0E1A27]/10">
                    Editar
                  </button>
                  <button className="rounded-xl bg-[#d9534f] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#c9302c]">
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
