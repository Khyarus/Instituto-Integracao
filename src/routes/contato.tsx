import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactForm } from "@/schemas/contact";
import { executeRecaptcha } from "@/utils/recaptcha";
import { toast } from "sonner";
import { api } from "@/lib/axios";

export const Route = createFileRoute("/contato")({
  component: ContatoPage,
  head: () => ({
    meta: [
      { title: "Contato — Instituto Integração" },
      { name: "description", content: "Entre em contato com o Instituto Integração. Estamos na Rua Princesa Izabel, 1409, Jardim Independência II, Sarandi, PR." },
      { property: "og:title", content: "Contato — Instituto Integração" },
      { property: "og:description", content: "Fale conosco e saiba como ajudar." },
    ],
  }),
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function ContatoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      mensagem: "",
      lgpd: false,
      recaptchaToken: "pending",
    },
  });

  const lgpdValue = watch("lgpd");

  const onSubmit = async (data: ContactForm) => {
    setLoading(true);
    try {
      const token = await executeRecaptcha("contact");

      // Request would normally go to backend
      // await api.post("/contact", { ...data, recaptchaToken: token });

      await new Promise((r) => setTimeout(r, 1500));
      setSubmitted(true);
      toast.success("Mensagem enviada com sucesso!");
    } catch (error: any) {
      toast.error(error.message || "Erro ao enviar mensagem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="gradient-hero py-16 sm:py-20">
        <motion.div
          className="mx-auto max-w-4xl px-4 text-center sm:px-6"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <h1 className="font-[var(--font-heading)] text-4xl font-bold text-primary-foreground sm:text-5xl">
            Entre em Contato
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            Estamos aqui para ouvir você. Envie sua mensagem e responderemos em breve.
          </p>
        </motion.div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {/* Contact info */}
          <motion.div
            className="space-y-6 lg:col-span-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="font-[var(--font-heading)] text-2xl font-bold text-foreground">
              Informações
            </h2>
            {[
              { icon: MapPin, label: "Endereço", value: "Rua Princesa Izabel, 1409 – Jardim Independência II, Sarandi/PR, CEP 87.113-030" },
              { icon: Mail, label: "E-mail", value: "kellypessutimga@hotmail.com" },
            ].map((item) => (
              <Card key={item.label} className="border-border/50">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-medium text-foreground">{item.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            className="lg:col-span-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <Card className="border-border/50">
              <CardContent className="p-6 sm:p-8">
                {submitted ? (
                  <div className="py-12 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                      <Send className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="mt-4 font-[var(--font-heading)] text-xl font-bold text-foreground">
                      Mensagem enviada!
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Agradecemos seu contato. Responderemos o mais breve possível.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-6"
                      onClick={() => setSubmitted(false)}
                    >
                      Enviar outra mensagem
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome *</Label>
                        <Input id="nome" placeholder="Seu nome completo" {...register("nome")} />
                        {errors.nome && <p className="text-xs text-destructive">{errors.nome.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail *</Label>
                        <Input id="email" type="email" placeholder="seu@email.com" {...register("email")} />
                        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input id="telefone" placeholder="(00) 00000-0000" {...register("telefone")} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mensagem">Mensagem *</Label>
                      <Textarea id="mensagem" placeholder="Escreva sua mensagem..." rows={5} {...register("mensagem")} />
                      {errors.mensagem && <p className="text-xs text-destructive">{errors.mensagem.message}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-start gap-2">
                        <Checkbox
                          id="lgpd"
                          checked={lgpdValue}
                          onCheckedChange={(checked) => setValue("lgpd", checked === true, { shouldValidate: true })}
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
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {loading ? "Enviando..." : "Enviar Mensagem"}
                      {!loading && <Send className="ml-2 h-4 w-4" />}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
