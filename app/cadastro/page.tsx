export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0E1D1] p-4">
      <div className="w-full max-w-md rounded-2xl bg-white/95 p-8 shadow-2xl shadow-[#0E1A27]/10 border border-[#26436C]/10 backdrop-blur-sm">
        
        <h1 className="mb-2 text-center text-3xl font-bold text-[#0E1A27]">
          Cadastro
        </h1>
        <p className="mb-8 text-center text-sm font-medium text-[#26436C]">
          Cadastre-se e faça parte da nossa linda lista de usuários!
        </p>

        <form className="space-y-5">
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
              className="w-full rounded-xl border border-[#26436C]/20 bg-[#f0E1D1]/30 px-4 py-3 text-[#0E1A27] placeholder-[#26436C]/50 outline-none transition-all focus:border-[#26436C] focus:ring-2 focus:ring-[#26436C]/20"
              required
            />
          </div>

          <div>
            <label htmlFor="password" 
              className="mb-1.5 block text-sm font-semibold text-[#0E1A27]"
            >
              Confirmar Senha
            </label>
            <input
              id="password"
              type="password"
              placeholder=""
              className="w-full rounded-xl border border-[#26436C]/20 bg-[#f0E1D1]/30 px-4 py-3 text-[#0E1A27] placeholder-[#26436C]/50 outline-none transition-all focus:border-[#26436C] focus:ring-2 focus:ring-[#26436C]/20"
              required
            />
          </div>


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