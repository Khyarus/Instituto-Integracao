import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Home, UserPlus, MessageSquare } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

const kpis = [
  { label: "Famílias Cadastradas", value: "352", icon: Home, change: "+12 este mês" },
  { label: "Novos Cadastros (mês)", value: "12", icon: UserPlus, change: "+3 vs. mês anterior" },
  { label: "Total de Usuários", value: "48", icon: Users, change: "4 administradores" },
  { label: "Mensagens Não Lidas", value: "7", icon: MessageSquare, change: "3 novas hoje" },
];

const chartData = [
  { mes: "Jan", cadastros: 8 },
  { mes: "Fev", cadastros: 12 },
  { mes: "Mar", cadastros: 15 },
  { mes: "Abr", cadastros: 10 },
  { mes: "Mai", cadastros: 18 },
  { mes: "Jun", cadastros: 14 },
  { mes: "Jul", cadastros: 20 },
  { mes: "Ago", cadastros: 16 },
  { mes: "Set", cadastros: 22 },
  { mes: "Out", cadastros: 19 },
  { mes: "Nov", cadastros: 11 },
  { mes: "Dez", cadastros: 12 },
];

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="font-[var(--font-heading)] text-2xl font-bold text-foreground">
        Dashboard
      </h1>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{kpi.label}</p>
                  <p className="mt-1 text-3xl font-bold text-foreground">{kpi.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{kpi.change}</p>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary">
                  <kpi.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="font-[var(--font-heading)] text-lg">
            Cadastros por Mês
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="mes" tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" />
                <YAxis tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="cadastros" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
