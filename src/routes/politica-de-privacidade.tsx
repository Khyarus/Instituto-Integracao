import { createFileRoute } from "@tanstack/react-router";
import { Shield } from "lucide-react";

export const Route = createFileRoute("/politica-de-privacidade")({
  component: PoliticaPage,
  head: () => ({
    meta: [
      { title: "Política de Privacidade — Instituto Esperança" },
      { name: "description", content: "Política de privacidade e proteção de dados do Instituto Esperança conforme a LGPD." },
    ],
  }),
});

function PoliticaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <Shield className="h-8 w-8 text-primary" />
        <h1 className="font-[var(--font-heading)] text-3xl font-bold text-foreground sm:text-4xl">
          Política de Privacidade
        </h1>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Última atualização: Janeiro de 2024
      </p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-3 font-[var(--font-heading)] text-xl font-semibold text-foreground">
            1. Dados Coletados
          </h2>
          <p>Coletamos os seguintes dados pessoais quando você utiliza nossos serviços:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Nome completo</li>
            <li>CPF</li>
            <li>Endereço de e-mail</li>
            <li>Número de telefone</li>
            <li>Endereço residencial (para famílias cadastradas)</li>
            <li>Dados de crianças dependentes (nome, idade, situação escolar e vacinal)</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 font-[var(--font-heading)] text-xl font-semibold text-foreground">
            2. Finalidade da Coleta
          </h2>
          <p>Os dados são coletados para:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Cadastro e acompanhamento de famílias assistidas</li>
            <li>Comunicação sobre programas e atividades do instituto</li>
            <li>Elaboração de relatórios internos e estatísticas de impacto</li>
            <li>Cumprimento de obrigações legais</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 font-[var(--font-heading)] text-xl font-semibold text-foreground">
            3. Tempo de Armazenamento
          </h2>
          <p>
            Os dados pessoais serão armazenados pelo período necessário ao cumprimento das finalidades descritas, ou conforme exigido por obrigações legais. Dados de famílias desligadas são mantidos por até 5 anos para fins de relatórios e auditoria.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-[var(--font-heading)] text-xl font-semibold text-foreground">
            4. Direitos do Titular
          </h2>
          <p>Conforme a LGPD (Lei 13.709/2018), você tem direito a:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Confirmar a existência de tratamento de seus dados</li>
            <li>Acessar seus dados pessoais</li>
            <li>Solicitar a correção de dados incompletos ou desatualizados</li>
            <li>Solicitar a exclusão de seus dados pessoais</li>
            <li>Revogar o consentimento para uso dos dados</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 font-[var(--font-heading)] text-xl font-semibold text-foreground">
            5. Contato do DPO
          </h2>
          <p>
            Para exercer seus direitos ou esclarecer dúvidas sobre o tratamento de dados pessoais, entre em contato com nosso Encarregado de Proteção de Dados (DPO):
          </p>
          <p className="mt-2 font-medium text-foreground">
            E-mail: dpo@instituto.org.br<br />
            Telefone: (44) 99999-0000
          </p>
        </section>
      </div>
    </div>
  );
}
