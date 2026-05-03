import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { Link } from "@tanstack/react-router";
import Cookies from "js-cookie";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const handleConsent = (type: "all" | "essential" | "reject") => {
    Cookies.set("cookie_consent", type, {
      expires: 365,
      secure: true,
      sameSite: "strict",
    });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card p-4 shadow-lg sm:p-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Shield className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div className="text-sm text-muted-foreground">
            <p>
              Utilizamos cookies para melhorar sua experiência. Consulte nossa{" "}
              <Link to="/politica-de-privacidade" className="text-primary underline">
                Política de Privacidade
              </Link>{" "}
              para mais informações.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={() => handleConsent("reject")}>
            Rejeitar
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleConsent("essential")}>
            Apenas Essenciais
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground" onClick={() => handleConsent("all")}>
            Aceitar Todos
          </Button>
        </div>
      </div>
    </div>
  );
}
