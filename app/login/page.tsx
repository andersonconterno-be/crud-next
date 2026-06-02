export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0E1D1] p-4">
      {/* Container do formulário com fundo branco translúcido para destacar do fundo creme */}
      <div className="w-full max-w-md rounded-2xl bg-white/95 p-8 shadow-2xl shadow-[#0E1A27]/10 border border-[#26436C]/10 backdrop-blur-sm">
        
        <h1 className="mb-2 text-center text-3xl font-bold text-[#0E1A27]">
          Login
        </h1>
        <p className="mb-8 text-center text-sm font-medium text-[#26436C]">
          Bem-vindo de volta! Por favor, insira seus dados.
        </p>

        <form className="space-y-5">
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
              className="w-full rounded-xl border border-[#26436C]/20 bg-[#f0E1D1]/30 px-4 py-3 text-[#0E1A27] placeholder-[#26436C]/50 outline-none transition-all focus:border-[#26436C] focus:ring-2 focus:ring-[#26436C]/20"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 font-medium text-[#26436C] cursor-pointer">
              <input 
                type="checkbox" 
                className="rounded border-[#26436C]/30 text-[#0E1A27] focus:ring-[#0E1A27]" 
              />
              Lembrar de mim
            </label>
            <a href="#" className="font-semibold text-[#26436C] hover:text-[#0E1A27] transition-colors">
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