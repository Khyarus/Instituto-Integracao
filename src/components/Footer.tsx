import { Link } from "@tanstack/react-router";
import { Mail, MapPin } from "lucide-react";
import logoSrc from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="gradient-hero text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <img
                src={logoSrc}
                alt="Logo Instituto Integração"
                className="h-8 w-8 rounded-lg object-contain brightness-0 invert"
              />
              <span className="font-[var(--font-heading)] text-lg font-bold">
                Instituto Integração
              </span>
            </div>
            <p className="mt-3 text-sm opacity-80">
              Promovendo o desenvolvimento humano e social de crianças, mulheres e famílias em Sarandi, PR.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider opacity-70">
              Navegação
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/" className="opacity-80 hover:opacity-100 transition-opacity">Início</Link></li>
              <li><Link to="/sobre" className="opacity-80 hover:opacity-100 transition-opacity">Sobre</Link></li>
              <li><Link to="/doacoes" className="opacity-80 hover:opacity-100 transition-opacity">Doações</Link></li>
              <li><Link to="/contato" className="opacity-80 hover:opacity-100 transition-opacity">Contato</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider opacity-70">
              Legal
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/politica-de-privacidade" className="opacity-80 hover:opacity-100 transition-opacity">Política de Privacidade</Link></li>
              <li><Link to="/termos-de-uso" className="opacity-80 hover:opacity-100 transition-opacity">Termos de Uso</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider opacity-70">
              Contato
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center gap-2 opacity-80">
                <MapPin className="h-4 w-4 shrink-0" />
                Rua Princesa Izabel, 1409 – Jardim Independência II, Sarandi/PR
              </li>
              <li className="flex items-center gap-2 opacity-80">
                <Mail className="h-4 w-4 shrink-0" />
                kellypessutimga@hotmail.com
              </li>
              <li>
                <a
                  href="https://instagram.com/institutointegracao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity"
                >
                  @institutointegracao
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-primary-foreground/20 pt-6 text-center text-xs opacity-60">
          © {new Date().getFullYear()} Instituto Integração. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
