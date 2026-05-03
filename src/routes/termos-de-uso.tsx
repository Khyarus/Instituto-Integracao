import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";

export const Route = createFileRoute("/termos-de-uso")({
  component: TermosPage,
  head: () => ({
    meta: [
      { title: "Termos de Uso — Instituto Esperança" },
      { name: "description", content: "Termos de uso do sistema do Instituto Esperança." },
    ],
  }),
});

function TermosPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <FileText className="h-8 w-8 text-primary" />
        <h1 className="font-[var(--font-heading)] text-3xl font-bold text-foreground sm:text-4xl">
          Termos de Uso
        </h1>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Última atualização: Janeiro de 2024
      </p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-3 font-[var(--font-heading)] text-xl font-semibold text-foreground">
            1. Aceitação dos Termos
          </h2>
          <p>
            Ao acessar e utilizar este sistema, você concorda com estes Termos de Uso e com nossa Política de Privacidade. Se não concordar, não utilize o sistema.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-[var(--font-heading)] text-xl font-semibold text-foreground">
            2. Uso do Sistema
          </h2>
          <p>
            O sistema do Instituto Esperança destina-se ao gerenciamento de atividades da organização, cadastro de famílias assistidas e comunicação com apoiadores. O uso indevido, tentativa de acesso não autorizado ou qualquer ação que comprometa a segurança do sistema é proibida.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-[var(--font-heading)] text-xl font-semibold text-foreground">
            3. Responsabilidades do Usuário
          </h2>
          <ul className="list-inside list-disc space-y-1">
            <li>Manter suas credenciais de acesso em sigilo</li>
            <li>Fornecer informações verdadeiras e atualizadas</li>
            <li>Não compartilhar dados pessoais de terceiros sem autorização</li>
            <li>Reportar qualquer uso indevido ou vulnerabilidade encontrada</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 font-[var(--font-heading)] text-xl font-semibold text-foreground">
            4. Propriedade Intelectual
          </h2>
          <p>
            Todo o conteúdo do sistema, incluindo textos, imagens, logotipos e software, é de propriedade do Instituto Esperança e protegido por leis de direitos autorais.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-[var(--font-heading)] text-xl font-semibold text-foreground">
            5. Modificações
          </h2>
          <p>
            O Instituto reserva-se o direito de alterar estes Termos a qualquer momento. As alterações entram em vigor imediatamente após a publicação no sistema.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-[var(--font-heading)] text-xl font-semibold text-foreground">
            6. Contato
          </h2>
          <p>
            Dúvidas sobre estes Termos podem ser enviadas para: contato@instituto.org.br
          </p>
        </section>
      </div>
    </div>
  );
}
