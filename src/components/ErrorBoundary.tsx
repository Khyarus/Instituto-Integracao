import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * ErrorBoundary
 * 
 * Catches JavaScript errors in their child component tree,
 * logs those errors, and displays a fallback UI instead.
 */
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error("Uncaught error:", error, errorInfo);
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <ShieldAlert className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="mt-4 text-2xl font-bold">Ops! Algo deu errado.</h1>
          <p className="mt-2 max-w-md text-muted-foreground">
            Ocorreu um erro inesperado. Não se preocupe, seus dados estão seguros.
            Tente atualizar a página ou volte para o início.
          </p>
          <div className="mt-6 flex gap-4">
            <Button onClick={() => window.location.reload()}>
              Recarregar Página
            </Button>
            <Button variant="outline" onClick={() => (window.location.href = "/")}>
              Voltar ao Início
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
