import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Shield, BookOpen, Baby, Home, Target, Eye, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import logoSrc from "@/assets/logo.png";

export const Route = createFileRoute("/sobre")({
  component: SobrePage,
  head: () => ({
    meta: [
      { title: "Sobre — Instituto Integração" },
      { name: "description", content: "Conheça a história, missão, visão e valores do Instituto Integração. Atuamos em Sarandi, PR com foco em crianças com autismo, mulheres e famílias vulneráveis." },
      { property: "og:title", content: "Sobre — Instituto Integração" },
      { property: "og:description", content: "Conheça nossa história e missão de transformação social em Sarandi, PR." },
    ],
  }),
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const values = [
  { icon: Heart, title: "Transparência", text: "Todo recurso é integralmente revertido à causa, com escrituração contábil rigorosa e Conselho Fiscal independente." },
  { icon: Shield, title: "Idoneidade", text: "Atuação ética e comprometida, sem fins lucrativos e com atendimento universal e gratuito a todos." },
  { icon: BookOpen, title: "Inclusão", text: "Nenhuma familia é excluída por renda, religião, etnia ou qualquer outra condição." },
  { icon: Baby, title: "Família", text: "Fortalecimento do núcleo familiar como forma de transformação comunitária e social." },
];

function SobrePage() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero py-16 sm:py-24">
        <motion.div
          className="mx-auto max-w-4xl px-4 text-center sm:px-6"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <div className="flex justify-center mb-1 -mt-16">
            <img
              src={logoSrc}
              alt="Logo Instituto Integração"
              className="h-64 w-64 rounded-3xl object-contain drop-shadow-2xl"
            />
          </div>
          <h1 className="font-[var(--font-heading)] text-4xl font-bold text-primary-foreground sm:text-5xl">
            Sobre o Instituto
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            Uma organização social sem fins lucrativos dedicada à transformação humana em Sarandi, PR
          </p>
        </motion.div>
      </section>

      {/* History */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="font-[var(--font-heading)] text-3xl font-bold text-foreground">Nossa História</h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                O Instituto Integração é uma Organização Social (OS) sem fins lucrativos, com sede na Rua Princesa Izabel, 1409, Jardim Independência II, Sarandi/PR – CEP 87.113-030 – CNPJ 11.206.025/0001-62.
              </p>
              <p>
                Nossa atuação é voltada ao desenvolvimento humano e social, com foco especial em crianças com autismo e dificuldades de aprendizagem, mulheres e famílias em situação de vulnerabilidade social, nas áreas de Educação, Saúde, Cultura, Esporte e Comunicação.
              </p>
              <p>
                Trabalhamos com transparência absoluta: todo recurso captado é integralmente revertido à causa. Nossa equipe conta com voluntários, colaboradores e uma Diretoria comprometida com a idoneidade financeira e o atendimento universal e gratuito.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision */}
      <section className="bg-secondary py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Card className="h-full border-border/50">
              <CardContent className="p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                  <Target className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="mt-4 font-[var(--font-heading)] text-2xl font-bold text-foreground">Missão</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Promover o desenvolvimento humano e social, com foco em crianças com autismo e dificuldades de aprendizagem, mulheres e famílias em vulnerabilidade social, atuando nas áreas de Educação, Saúde, Cultura, Esporte e Comunicação, sem fins lucrativos e com atendimento universal e gratuito.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Card className="h-full border-border/50">
              <CardContent className="p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-amber">
                  <Eye className="h-6 w-6 text-amber-foreground" />
                </div>
                <h3 className="mt-4 font-[var(--font-heading)] text-2xl font-bold text-foreground">Visão</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Ser referência regional em atendimento especializado para crianças com autismo, assistência social e transformação comunitária, reconhecidos pela transparência, idoneidade e impacto positivo nas famílias atendidas.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-center font-[var(--font-heading)] text-3xl font-bold text-foreground"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            Nossos Valores
          </motion.h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { delay: i * 0.1, duration: 0.6 } } }}
              >
                <Card className="h-full border-border/50 text-center transition-shadow hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-secondary">
                      <v.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="mt-4 font-[var(--font-heading)] text-lg font-semibold text-foreground">{v.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
