import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginForm } from "@/schemas/auth";
import { executeRecaptcha } from "@/utils/recaptcha";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Entrar — Instituto Esperança" },
      { name: "description", content: "Acesse sua conta no Instituto Esperança." },
    ],
  }),
});

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      senha: "",
      recaptchaToken: "pending", // Placeholder
    },
  });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      const token = await executeRecaptcha("login");
      
      // Request would normally go to backend
      // const response = await api.post("/auth/login", { ...data, recaptchaToken: token });
      // setAuth(response.data.user);
      
      // Mocking successful login for demonstration
      await new Promise((r) => setTimeout(r, 1000));
      setAuth({ 
        id: "1", 
        name: "Admin User", 
        email: data.email, 
        role: "admin" 
      });
      
      toast.success("Login realizado com sucesso!");
      navigate({ to: "/admin" });
    } catch (error: any) {
      toast.error(error.message || "Erro ao realizar login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-border/50">
          <CardHeader className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-secondary">
              <Lock className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="mt-4 font-[var(--font-heading)] text-2xl">
              Acessar Conta
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Entre com seu e-mail e senha
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="seu@email.com" 
                    className="pl-10" 
                    {...register("email")}
                  />
                </div>
                {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="senha">Senha</Label>
                  <Link to="/recuperar-senha" title="Esqueci minha senha" className="text-xs text-primary hover:underline">
                    Esqueci minha senha
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    id="senha" 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10" 
                    {...register("senha")}
                  />
                </div>
                {errors.senha && <p className="text-xs text-destructive">{errors.senha.message}</p>}
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground"
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Não tem uma conta?{" "}
              <Link to="/cadastro" className="font-medium text-primary hover:underline">
                Cadastre-se
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
