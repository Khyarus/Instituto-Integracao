import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, Copy, Share2, CreditCard, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export const Route = createFileRoute("/doacoes")({
  component: DoacoesPage,
  head: () => ({
    meta: [
      { title: "Doações — Instituto Integração" },
      { name: "description", content: "Faça uma doação para o Instituto Integração e ajude crianças, mulheres e famílias vulneráveis em Sarandi, PR." },
      { property: "og:title", content: "Doe — Instituto Integração" },
      { property: "og:description", content: "Sua contribuição transforma vidas. Doe agora." },
    ],
  }),
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const bankInfo = {
  banco: "A definir",
  agencia: "A definir",
  conta: "A definir",
  cnpj: "11.206.025/0001-62",
  titular: "Instituto Integração",
  pix: "kellypessutimga@hotmail.com",
};

function DoacoesPage() {
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(""), 2000);
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(
      `Conheça o Instituto Integração! Ajude crianças, mulheres e famílias em Sarandi, PR. PIX: ${bankInfo.pix}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
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
            Faça uma Doação
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            Sua contribuição, de qualquer valor, é integralmente revertida à causa e ajuda a transformar a vida de crianças com autismo, mulheres e famílias em vulnerabilidade.
          </p>
        </motion.div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Impact explanation */}
          <motion.div
            className="mb-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="font-[var(--font-heading)] text-2xl font-bold text-foreground sm:text-3xl">
              Como sua doação ajuda
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {[
                { amount: "R$ 30", desc: "Cesta de alimentos para uma família por uma semana" },
                { amount: "R$ 100", desc: "Material escolar para 5 crianças durante um mês" },
                { amount: "R$ 250", desc: "Acompanhamento de saúde completo para uma família" },
              ].map((item) => (
                <Card key={item.amount} className="border-border/50 transition-shadow hover:shadow-lg">
                  <CardContent className="p-6 text-center">
                    <p className="font-[var(--font-heading)] text-3xl font-bold text-primary">{item.amount}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Bank info */}
          <motion.div
            className="grid gap-6 lg:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            {/* PIX */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-[var(--font-heading)]">
                  <CreditCard className="h-5 w-5 text-primary" />
                  PIX
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-secondary p-4 text-center">
                  <p className="text-xs text-muted-foreground">Chave PIX (E-mail)</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">{bankInfo.pix}</p>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => copyToClipboard(bankInfo.pix, "pix")}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  {copied === "pix" ? "Copiado!" : "Copiar Chave PIX"}
                </Button>
              </CardContent>
            </Card>

            {/* Transfer */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-[var(--font-heading)]">
                  <Building2 className="h-5 w-5 text-primary" />
                  Transferência Bancária
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  {[
                    { label: "Banco", value: bankInfo.banco },
                    { label: "Agência", value: bankInfo.agencia },
                    { label: "Conta Corrente", value: bankInfo.conta },
                    { label: "CNPJ", value: bankInfo.cnpj },
                    { label: "Titular", value: bankInfo.titular },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between rounded-lg bg-secondary px-4 py-2.5">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium text-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Share CTA */}
          <motion.div
            className="mt-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="text-muted-foreground">
              Não pode doar agora? Compartilhe e ajude a espalhar a palavra!
            </p>
            <Button
              onClick={shareWhatsApp}
              className="mt-4 bg-[oklch(0.60_0.15_145)] text-primary-foreground hover:bg-[oklch(0.55_0.15_145)]"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Compartilhar no WhatsApp
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
