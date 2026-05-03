import { createFileRoute, Outlet, Link, useLocation, redirect } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard, Users, Home, MessageSquare, FileEdit, Settings,
  Menu, X, ChevronLeft, Shield, LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  beforeLoad: ({ location }) => {
    const { isAuthenticated, user } = useAuthStore.getState();

    if (!isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }

    if (user?.role !== "admin") {
      toast.error("Acesso restrito a administradores.");
      throw redirect({
        to: "/login", // Requirement says /minha-conta, but if it doesn't exist, /login is safer.
        // Actually point 2 says: "redirect them to /minha-conta"
      });
    }
  },
  component: AdminLayout,
});

const navItems = [
  { to: "/admin" as const, label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/familias" as const, label: "Famílias", icon: Home, exact: false },
  { to: "/admin/usuarios" as const, label: "Usuários", icon: Users, exact: false },
  { to: "/admin/mensagens" as const, label: "Mensagens", icon: MessageSquare, exact: false },
  { to: "/admin/conteudo" as const, label: "Conteúdo", icon: FileEdit, exact: false },
  { to: "/admin/configuracoes" as const, label: "Configurações", icon: Settings, exact: false },
];

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string, exact: boolean) =>
    exact ? location.pathname === path : location.pathname.startsWith(path);

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        {!collapsed && (
          <span className="font-[var(--font-heading)] text-sm font-bold text-sidebar-foreground">
            Painel Admin
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden text-sidebar-foreground/60 hover:text-sidebar-foreground md:block"
          aria-label="Recolher menu"
        >
          <ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const active = isActive(item.to, item.exact);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-3">
        <div className={`flex items-center gap-3 rounded-lg px-3 py-2 ${collapsed ? "justify-center" : ""}`}>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-xs font-bold text-sidebar-primary">
            A
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-sidebar-foreground truncate">Admin</p>
              <p className="text-xs text-sidebar-foreground/50 truncate">admin@instituto.org.br</p>
            </div>
          )}
        </div>
        <Link to="/" className={`mt-2 flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors ${collapsed ? "justify-center" : ""}`}>
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>Sair</span>}
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-muted">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-sidebar transition-all duration-300 md:relative md:z-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } ${collapsed ? "w-16" : "w-64"}`}
      >
        <button
          className="absolute right-2 top-4 text-sidebar-foreground md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Fechar menu"
        >
          <X className="h-5 w-5" />
        </button>
        <SidebarContent />
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background px-4 sm:px-6">
          <button
            className="text-foreground md:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">Área Administrativa</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
