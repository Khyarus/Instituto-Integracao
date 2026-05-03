import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Shield } from "lucide-react";

export const Route = createFileRoute("/admin/usuarios")({
  component: UsuariosPage,
});

const mockUsers = [
  { id: 1, nome: "Admin Principal", email: "admin@instituto.org.br", role: "admin", data: "01/01/2024" },
  { id: 2, nome: "Maria Coordenadora", email: "maria@instituto.org.br", role: "admin", data: "15/02/2024" },
  { id: 3, nome: "João Voluntário", email: "joao@email.com", role: "user", data: "20/03/2024" },
  { id: 4, nome: "Ana Apoiadora", email: "ana@email.com", role: "user", data: "10/04/2024" },
];

function UsuariosPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-[var(--font-heading)] text-2xl font-bold text-foreground">
        Usuários
      </h1>
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="font-[var(--font-heading)] text-lg">Gerenciamento</CardTitle>
            <Badge variant="outline" className="gap-1 border-primary/30 text-primary">
              <Shield className="h-3 w-3" />
              Dados Pessoais Protegidos
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Perfil</TableHead>
                  <TableHead>Data de Cadastro</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUsers.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">{u.nome}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>
                      <Badge variant={u.role === "admin" ? "default" : "secondary"} className={u.role === "admin" ? "bg-amber text-amber-foreground" : ""}>
                        {u.role === "admin" ? "Administrador" : "Usuário"}
                      </Badge>
                    </TableCell>
                    <TableCell>{u.data}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button>
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
