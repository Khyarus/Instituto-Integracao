import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Eye, Check } from "lucide-react";

export const Route = createFileRoute("/admin/mensagens")({
  component: MensagensPage,
});

const mockMessages = [
  { id: 1, nome: "Carlos Silva", email: "carlos@email.com", assunto: "Quero ser voluntário", data: "10/06/2024", lida: false },
  { id: 2, nome: "Fernanda Costa", email: "fernanda@email.com", assunto: "Dúvida sobre doação", data: "09/06/2024", lida: false },
  { id: 3, nome: "Roberto Alves", email: "roberto@email.com", assunto: "Parceria institucional", data: "08/06/2024", lida: true },
  { id: 4, nome: "Lucia Mendes", email: "lucia@email.com", assunto: "Informações sobre cadastro", data: "07/06/2024", lida: true },
];

function MensagensPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-[var(--font-heading)] text-2xl font-bold text-foreground">
        Mensagens
      </h1>
      <div className="space-y-3">
        {mockMessages.map((msg) => (
          <Card key={msg.id} className={`border-border/50 transition-colors ${!msg.lida ? "border-l-4 border-l-primary bg-primary/5" : ""}`}>
            <CardContent className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{msg.nome}</p>
                    {!msg.lida && <Badge className="bg-primary text-primary-foreground text-xs">Nova</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">{msg.assunto}</p>
                  <p className="text-xs text-muted-foreground">{msg.email} · {msg.data}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="mr-1 h-3.5 w-3.5" />
                  Ver
                </Button>
                {!msg.lida && (
                  <Button variant="ghost" size="sm">
                    <Check className="mr-1 h-3.5 w-3.5" />
                    Marcar como lida
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
