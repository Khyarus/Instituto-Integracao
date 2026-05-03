import { Outlet, Link, createRootRoute, HeadContent, Scripts, useNavigate } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useAuthStore } from "@/stores/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

import appCss from "../styles.css?url";

const googleFontsUrl = "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap";
const API_URL = import.meta.env.VITE_API_URL || "https://api.yourdomain.com";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Página não encontrada
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você está procurando não existe ou foi removida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Instituto Integração — Transformação Social em Sarandi, PR" },
      { name: "description", content: "O Instituto Integração promove o desenvolvimento humano e social de crianças com autismo, mulheres e famílias em Sarandi, PR. Conheça nosso trabalho, doe e faça a diferença." },
      { property: "og:title", content: "Instituto Integração" },
      { property: "og:description", content: "Promovendo o desenvolvimento humano e social em Sarandi, PR." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      /* 
        SECURITY RECOMMENDATION:
        The meta tags below (CSP, X-Content-Type-Options, etc.) are commented out because they 
        frequently block Vite's HMR and internal scripts during development.
        
        For PRODUCTION: 
        1. These headers should be configured directly on the web server (Nginx, Vercel, Cloudflare).
        2. If using meta tags, ensure 'unsafe-inline' and 'unsafe-eval' are included (not recommended for max security).
        
        {
          httpEquiv: "Content-Security-Policy",
          content: `default-src 'self'; script-src 'self' https://www.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https:; connect-src 'self' ${API_URL} https://viacep.com.br; frame-src https://www.google.com; object-src 'none'; base-uri 'self';`,
        },
        { httpEquiv: "X-Content-Type-Options", content: "nosniff" },
        { httpEquiv: "X-Frame-Options", content: "DENY" },
      */
      { name: "Referrer-Policy", content: "strict-origin-when-cross-origin" },
      { name: "Permissions-Policy", content: "camera=(), microphone=(), geolocation=()" },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: googleFontsUrl },
    ],
    scripts: [
      {
        src: `https://www.google.com/recaptcha/api.js?render=${import.meta.env.VITE_RECAPTCHA_SITE_KEY || "explicit"}`,
        async: true,
        defer: true,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: () => (
    <>
      <Navbar />
      <NotFoundComponent />
      <Footer />
    </>
  ),
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <HeadContent />
      </head>
      <body>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { isAuthenticated, logout } = useAuthStore();
  // const queryClient = useQueryClient(); // #DESCOMENTAR NO FUTURO (Needs QueryClientProvider correctly configured in prototype)
  const navigate = useNavigate();

  // Implement automatic session timeout: 30 minutes of idle time (Requirement 1)
  useEffect(() => {
    if (!isAuthenticated) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        logout();
        // queryClient.clear(); // #DESCOMENTAR NO FUTURO: Wipe all cached data from React Query (Point 1)
        toast.error("Sessão expirada por inatividade. Faça login novamente.", {
          id: "session-timeout",
        });
        navigate({ to: "/login" });
      }, 30 * 60 * 1000); // 30 minutes
    };

    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"];
    events.forEach((event) => document.addEventListener(event, resetTimer));
    
    resetTimer();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      events.forEach((event) => document.removeEventListener(event, resetTimer));
    };
  }, [isAuthenticated, logout, navigate]);

  return (
    <>
      <Navbar />
      <main className="min-h-[60vh]">
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}
