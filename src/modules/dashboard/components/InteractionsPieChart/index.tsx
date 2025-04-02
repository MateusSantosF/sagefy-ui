"use client";

import { IClassMetric } from "@modules/dashboard/interfaces/IDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface ChartData {
  name: string;
  value: number;
  classCode: string;
}

interface InteractionsPieChartProps {
  metrics: Record<string, IClassMetric[]> | undefined;
  onClassSelect: (classCode: string) => void;
}

export function InteractionsPieChart({
  metrics,
  onClassSelect,
}: InteractionsPieChartProps) {
  // Calcula o total de conversas por turma
  const chartData: ChartData[] = Object.entries(metrics ?? {})
    .map(([classCode, classMetrics]) => {
      const totalConversations = classMetrics.reduce(
        (sum, metric) => sum + metric.total_conversations,
        0
      );
      return {
        name: `Turma ${classCode}`,
        value: totalConversations,
        classCode,
      };
    })
    .filter((item) => item.value > 0);

  const COLORS = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444", "#ec4899"];

  const handlePieClick = (data: ChartData) => {
    if (data && data.classCode) {
      onClassSelect(data.classCode);
    }
  };

  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Interações Totais por Turma</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                onClick={handlePieClick}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value} conversas`, ""]} />
              <Legend onClick={(data) => handlePieClick(data as ChartData)} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500">Sem dados de interação disponíveis</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
