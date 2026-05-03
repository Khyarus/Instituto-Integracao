import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export const Route = createFileRoute("/admin/configuracoes")({
  component: ConfiguracoesPage,
});

function ConfiguracoesPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-[var(--font-heading)] text-2xl font-bold text-foreground">
        Configurações
      </h1>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="font-[var(--font-heading)] text-lg">Informações do Instituto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Nome do Instituto</Label>
              <Input defaultValue="Instituto Esperança" />
            </div>
            <div className="space-y-2">
              <Label>E-mail de Contato</Label>
              <Input defaultValue="contato@instituto.org.br" />
            </div>
            <div className="space-y-2">
              <Label>Telefone</Label>
              <Input defaultValue="(44) 99999-0000" />
            </div>
            <div className="space-y-2">
              <Label>Instagram</Label>
              <Input defaultValue="@institutosperanca" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="font-[var(--font-heading)] text-lg">Dados Bancários para Doação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Banco</Label>
              <Input defaultValue="Banco do Brasil" />
            </div>
            <div className="space-y-2">
              <Label>Agência</Label>
              <Input defaultValue="1234-5" />
            </div>
            <div className="space-y-2">
              <Label>Conta Corrente</Label>
              <Input defaultValue="12345-6" />
            </div>
            <div className="space-y-2">
              <Label>CNPJ</Label>
              <Input defaultValue="12.345.678/0001-90" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Chave PIX</Label>
              <Input defaultValue="contato@instituto.org.br" />
            </div>
          </div>
          <Button className="bg-primary text-primary-foreground">
            <Save className="mr-2 h-4 w-4" />
            Salvar Configurações
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
