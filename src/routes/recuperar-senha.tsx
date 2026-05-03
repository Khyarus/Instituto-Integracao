import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recoverySchema, RecoveryForm } from "@/schemas/auth";
import { executeRecaptcha } from "@/utils/recaptcha";
import { toast } from "sonner";
import { api } from "@/lib/axios";

export const Route = createFileRoute("/recuperar-senha")({
  component: RecuperarSenhaPage,
  head: () => ({
    meta: [
      { title: "Recuperar Senha — Instituto Esperança" },
    ],
  }),
});

function RecuperarSenhaPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoveryForm>({
    resolver: zodResolver(recoverySchema),
    defaultValues: {
      email: "",
      recaptchaToken: "pending",
    },
  });

  const onSubmit = async (data: RecoveryForm) => {
    setLoading(true);
    try {
      const token = await executeRecaptcha("password_recovery");
      
      // Request would normally go to backend
      // await api.post("/auth/recover-password", { ...data, recaptchaToken: token });
      
      await new Promise((r) => setTimeout(r, 1500));
      setSent(true);
      toast.success("Link de recuperação enviado se o e-mail estiver cadastrado.");
    } catch (error: any) {
      toast.error(error.message || "Erro ao solicitar recuperação de senha.");
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
      >
        <Card className="border-border/50">
          <CardHeader className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-secondary">
              <Mail className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="mt-4 font-[var(--font-heading)] text-2xl">
              Recuperar Senha
            </CardTitle>
          </CardHeader>
          <CardContent>
            {sent ? (
              <div className="py-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Se o e-mail estiver cadastrado, enviaremos instruções para redefinir sua senha. Verifique sua caixa de entrada e spam.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="seu@email.com" {...register("email")} />
                  {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground"
                >
                  {loading ? "Enviando..." : "Enviar Link de Recuperação"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
