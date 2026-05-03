import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Trash2, Shield } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/familias")({
  component: FamiliasPage,
});

import { maskCpf } from "@/utils/masks";

const mockFamilias = [
  { id: 1, nome: "Maria da Silva", cpf: "12345678912", criancas: 3, data: "15/01/2024", status: "Ativo" },
  { id: 2, nome: "Ana Santos", cpf: "98765432134", criancas: 2, data: "22/02/2024", status: "Ativo" },
  { id: 3, nome: "Joana Oliveira", cpf: "11122233356", criancas: 1, data: "10/03/2024", status: "Inativo" },
  { id: 4, nome: "Carla Souza", cpf: "44455566678", criancas: 4, data: "05/04/2024", status: "Ativo" },
  { id: 5, nome: "Paula Lima", cpf: "77788899990", criancas: 2, data: "18/05/2024", status: "Ativo" },
];

function FamiliasPage() {
  const [search, setSearch] = useState("");

  const filtered = mockFamilias.filter((f) =>
    f.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-[var(--font-heading)] text-2xl font-bold text-foreground">
          Famílias
        </h1>
        <Button className="bg-primary text-primary-foreground">
          <Plus className="mr-2 h-4 w-4" />
          Nova Família
        </Button>
      </div>

      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <CardTitle className="font-[var(--font-heading)] text-lg">
                Cadastros
              </CardTitle>
              <Badge variant="outline" className="gap-1 border-primary/30 text-primary">
                <Shield className="h-3 w-3" />
                Dados Pessoais Protegidos
              </Badge>
            </div>
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome da Mãe/Responsável</TableHead>
                  <TableHead>CPF</TableHead>
                  <TableHead className="text-center">Crianças</TableHead>
                  <TableHead>Data de Cadastro</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((f) => (
                  <TableRow key={f.id}>
                    <TableCell className="font-medium">{f.nome}</TableCell>
                    <TableCell className="font-mono text-xs">{maskCpf(f.cpf)}</TableCell>
                    <TableCell className="text-center">{f.criancas}</TableCell>
                    <TableCell>{f.data}</TableCell>
                    <TableCell>
                      <Badge
                        variant={f.status === "Ativo" ? "default" : "secondary"}
                        className={f.status === "Ativo" ? "bg-primary/10 text-primary" : ""}
                      >
                        {f.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
