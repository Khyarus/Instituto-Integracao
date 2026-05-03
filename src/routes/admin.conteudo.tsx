import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export const Route = createFileRoute("/admin/conteudo")({
  component: ConteudoPage,
});

function ConteudoPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-[var(--font-heading)] text-2xl font-bold text-foreground">
        Gestão de Conteúdo
      </h1>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pillars */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="font-[var(--font-heading)] text-lg">Pilares do Instituto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {["Proteção", "Educação", "Saúde", "Moradia"].map((p) => (
              <div key={p} className="space-y-2">
                <Label>{p}</Label>
                <Textarea placeholder={`Descrição do pilar ${p}...`} rows={2} />
              </div>
            ))}
            <Button className="bg-primary text-primary-foreground">
              <Save className="mr-2 h-4 w-4" />
              Salvar Pilares
            </Button>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="font-[var(--font-heading)] text-lg">Estatísticas de Impacto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Famílias Atendidas", placeholder: "350" },
              { label: "Voluntários Ativos", placeholder: "120" },
              { label: "Anos de Atuação", placeholder: "8" },
              { label: "Crianças Beneficiadas", placeholder: "1200" },
            ].map((s) => (
              <div key={s.label} className="space-y-2">
                <Label>{s.label}</Label>
                <Input placeholder={s.placeholder} />
              </div>
            ))}
            <Button className="bg-primary text-primary-foreground">
              <Save className="mr-2 h-4 w-4" />
              Salvar Estatísticas
            </Button>
          </CardContent>
        </Card>

        {/* Testimonials */}
        <Card className="border-border/50 lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-[var(--font-heading)] text-lg">Depoimentos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Gerencie depoimentos exibidos na página inicial. Use o botão abaixo para adicionar um novo.
            </p>
            <Button variant="outline" className="mt-4">
              + Adicionar Depoimento
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
