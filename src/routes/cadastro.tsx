import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema, RegistrationForm } from "@/schemas/auth";
import { executeRecaptcha } from "@/utils/recaptcha";
import { toast } from "sonner";
import { api } from "@/lib/axios";

export const Route = createFileRoute("/cadastro")({
  component: CadastroPage,
  head: () => ({
    meta: [
      { title: "Cadastro — Instituto Esperança" },
      { name: "description", content: "Crie sua conta no Instituto Esperança." },
    ],
  }),
});

function CadastroPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      nome: "",
      email: "",
      cpf: "",
      telefone: "",
      senha: "",
      confirmar: "",
      lgpd: false,
      recaptchaToken: "pending",
    },
  });

  const lgpdValue = watch("lgpd");

  const onSubmit = async (data: RegistrationForm) => {
    setLoading(true);
    try {
      const token = await executeRecaptcha("registration");
      
      // Request would normally go to backend
      // await api.post("/auth/register", { ...data, recaptchaToken: token });
      
      await new Promise((r) => setTimeout(r, 1500));
      toast.success("Conta criada com sucesso! Faça login.");
      navigate({ to: "/login" });
    } catch (error: any) {
      toast.error(error.message || "Erro ao criar conta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <motion.div
        className="w-full max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-border/50">
          <CardHeader className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-secondary">
              <UserPlus className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="mt-4 font-[var(--font-heading)] text-2xl">
              Criar Conta
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Preencha os dados abaixo para se cadastrar
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo *</Label>
                <Input id="nome" placeholder="Seu nome completo" {...register("nome")} />
                {errors.nome && <p className="text-xs text-destructive">{errors.nome.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input id="email" type="email" placeholder="seu@email.com" {...register("email")} />
                {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input id="cpf" placeholder="000.000.000-00" {...register("cpf")} />
                  {errors.cpf && <p className="text-xs text-destructive">{errors.cpf.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone *</Label>
                  <Input id="telefone" placeholder="(00) 00000-0000" {...register("telefone")} />
                  {errors.telefone && <p className="text-xs text-destructive">{errors.telefone.message}</p>}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="senha">Senha *</Label>
                  <Input id="senha" type="password" placeholder="••••••••" {...register("senha")} />
                  {errors.senha && <p className="text-xs text-destructive">{errors.senha.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmar">Confirmar Senha *</Label>
                  <Input id="confirmar" type="password" placeholder="••••••••" {...register("confirmar")} />
                  {errors.confirmar && <p className="text-xs text-destructive">{errors.confirmar.message}</p>}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="lgpd"
                    checked={lgpdValue}
                    onCheckedChange={(c) => setValue("lgpd", c === true, { shouldValidate: true })}
                  />
                  <Label htmlFor="lgpd" className="text-xs text-muted-foreground leading-relaxed">
                    Li e aceito a{" "}
                    <Link to="/politica-de-privacidade" className="text-primary underline">
                      Política de Privacidade
                    </Link>{" "}
                    e autorizo o uso dos meus dados conforme a LGPD (Lei 13.709/2018) *
                  </Label>
                </div>
                {errors.lgpd && <p className="text-xs text-destructive">{errors.lgpd.message}</p>}
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground"
              >
                {loading ? "Cadastrando..." : "Criar Conta"}
              </Button>
            </form>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Entrar
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
