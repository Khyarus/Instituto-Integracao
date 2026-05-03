import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, Users, Calendar, HandHeart, Camera, Quote, ArrowRight, Shield, BookOpen, Baby, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-image.jpg";
import logoSrc from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Instituto Integração — Transformação Social em Sarandi, PR" },
      { name: "description", content: "Promovemos o desenvolvimento humano e social de crianças com autismo, mulheres e famílias em Sarandi, PR. Conheça nosso trabalho e faça a diferença." },
    ],
  }),
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const pillars = [
  { icon: BookOpen, title: "Educação", description: "Suporte pedagógico especializado para crianças com autismo e dificuldades de aprendizagem." },
  { icon: Baby, title: "Saúde", description: "Acompanhamento e orientação para o desenvolvimento integral de crianças atendidas." },
  { icon: Shield, title: "Assistência Social", description: "Fortalecimento de vínculos familiares e apoio a mulheres e famílias em vulnerabilidade." },
  { icon: Home, title: "Cultura & Esporte", description: "Atividades de arte, cultura e esporte como ferramentas de socialização e desenvolvimento cognitivo." },
];

const stats = [
  { value: "100%", label: "Recursos Revertidos à Causa" },
  { value: "0", label: "Discriminação — Atendimento Gratuito" },
  { value: "4", label: "Eixos de Atuação" },
  { value: "Sarandi", label: "Comunidade Atendida / PR" },
];

const helpCards = [
  { icon: Heart, title: "Faça uma Doação", description: "Sua contribuição é integralmente revertida à causa. Qualquer valor transforma vidas.", link: "/doacoes", cta: "Doar Agora" },
  { icon: Users, title: "Seja Voluntário", description: "Dedique seu tempo e habilidades para apoiar crianças e famílias que mais precisam.", link: "/contato", cta: "Quero Ajudar" },
  { icon: HandHeart, title: "Compartilhe", description: "Ajude divulgando nosso trabalho nas redes sociais e captando novos colaboradores.", link: "/contato", cta: "Saiba Mais" },
];

const testimonials = [
  { name: "Responsável A.", text: "O Instituto Integração mudou a vida do meu filho. O suporte pedagógico especializado fez toda a diferença no desenvolvimento dele.", role: "Responsável por criança atendida" },
  { name: "Colaboradora B.", text: "Ser voluntária aqui me mostrou o impacto real que uma organização transparente e dedicada pode causar na comunidade.", role: "Voluntária" },
  { name: "Mãe C.", text: "Minha filha tem autismo e encontramos aqui o atenção especializada que não tínhamos acesso antes. Sou muito grata.", role: "Responsável por criança atendida" },
];

function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
        <div className="absolute inset-0">
          <img src={heroImage} alt="" className="h-full w-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 gradient-hero opacity-85" />
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-amber blur-3xl" />
          <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-primary-foreground blur-3xl" />
        </div>
        <motion.div
          className="relative mx-auto max-w-4xl px-4 text-center sm:px-6"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-1 -mt-32">
            <img
              src={logoSrc}
              alt="Logo Instituto Integração"
              className="h-128 w-128 rounded-3xl object-contain drop-shadow-2xl"
            />
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="font-[var(--font-heading)] text-4xl font-bold leading-tight text-primary-foreground sm:text-5xl lg:text-6xl"
          >
            Integrando vidas com{" "}
            <span className="text-amber">amor e inclusão</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80"
          >
            Promovemos o desenvolvimento humano e social de crianças com autismo, mulheres e famílias em vulnerabilidade em Sarandi, PR, atuando nas áreas de Educação, Saúde, Cultura e Esporte.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/sobre">
              <Button size="lg" className="bg-amber text-amber-foreground hover:bg-amber/90 font-semibold">
                Conheça nosso trabalho
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/doacoes">
              <Button size="lg" className="bg-white text-black hover:bg-black hover:text-white border-none font-semibold transition-all duration-300">
                <Heart className="mr-2 h-4 w-4" />
                Faça uma doação
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Pillars */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="font-[var(--font-heading)] text-3xl font-bold text-foreground sm:text-4xl">
              Sobre o Instituto
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Nosso trabalho é sustentado por quatro pilares fundamentais
            </p>
          </motion.div>
          <motion.div
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {pillars.map((pillar) => (
              <motion.div key={pillar.title} variants={fadeUp}>
                <Card className="h-full border-border/50 bg-card transition-shadow hover:shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-secondary">
                      <pillar.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="mt-4 font-[var(--font-heading)] text-lg font-semibold text-foreground">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {pillar.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp} className="text-center">
                <p className="font-[var(--font-heading)] text-4xl font-bold text-primary">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How to Help */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="font-[var(--font-heading)] text-3xl font-bold text-foreground sm:text-4xl">
              Como Ajudar
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Existem diversas maneiras de contribuir com nosso trabalho
            </p>
          </motion.div>
          <motion.div
            className="mt-12 grid gap-6 sm:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {helpCards.map((card) => (
              <motion.div key={card.title} variants={fadeUp}>
                <Card className="group h-full border-border/50 bg-card transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardContent className="flex flex-col p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg gradient-amber">
                      <card.icon className="h-6 w-6 text-amber-foreground" />
                    </div>
                    <h3 className="mt-4 font-[var(--font-heading)] text-lg font-semibold text-foreground">
                      {card.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">
                      {card.description}
                    </p>
                    <Link to={card.link} className="mt-4">
                      <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {card.cta}
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-warm py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="font-[var(--font-heading)] text-3xl font-bold text-foreground sm:text-4xl">
              Depoimentos
            </h2>
          </motion.div>
          <motion.div
            className="mt-12 grid gap-6 md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={fadeUp}>
                <Card className="h-full border-border/50 bg-card">
                  <CardContent className="p-6">
                    <Quote className="h-8 w-8 text-amber/40" />
                    <p className="mt-4 text-sm italic text-muted-foreground leading-relaxed">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <div className="mt-4 border-t border-border pt-4">
                      <p className="text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary/5 py-16 sm:py-20 border-t border-border/50">
        <motion.div
          className="mx-auto max-w-3xl px-4 text-center sm:px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="font-[var(--font-heading)] text-3xl font-bold text-foreground sm:text-4xl">
            Juntos podemos transformar vidas
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Cada gesto de solidariedade cria um futuro melhor para famílias que mais precisam.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/doacoes">
              <Button size="lg" className="bg-amber text-black hover:bg-black hover:text-amber font-semibold transition-all duration-300">
                <Heart className="mr-2 h-4 w-4" />
                Faça uma Doação
              </Button>
            </Link>
            <Link to="/contato">
              <Button size="lg" className="bg-white text-black hover:bg-black hover:text-white border border-black/10 font-semibold transition-all duration-300">
                Entre em Contato
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
