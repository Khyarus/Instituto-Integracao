import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoSrc from "@/assets/logo.png";

const navLinks = [
  { to: "/" as const, label: "Início" },
  { to: "/sobre" as const, label: "Sobre" },
  { to: "/doacoes" as const, label: "Doações" },
  { to: "/contato" as const, label: "Contato" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logoSrc}
            alt="Logo Instituto Integração"
            className="h-16 w-16 rounded-xl object-contain"
          />
          <span className="font-[var(--font-heading)] text-xl font-bold text-foreground">
            Instituto Integração
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary ${location.pathname === link.to
                  ? "bg-secondary text-primary"
                  : "text-muted-foreground"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Entrar
            </Button>
          </Link>
          <Link to="/doacoes">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Doe
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="border-t border-border bg-background px-4 pb-4 pt-2 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${location.pathname === link.to
                  ? "bg-secondary text-primary"
                  : "text-muted-foreground hover:bg-muted"
                }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-2">
            <Link to="/login" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" className="w-full">Entrar</Button>
            </Link>
            <Link to="/doacoes" onClick={() => setMobileOpen(false)}>
              <Button className="w-full bg-primary text-primary-foreground">
                Doe Agora
              </Button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
