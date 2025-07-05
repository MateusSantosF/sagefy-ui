"use client";

import { IClassMetric } from "@modules/dashboard/interfaces/IDashboard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@shared/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";



interface InteractionsBarChartProps {
  metrics: Record<string, IClassMetric[]> | undefined;
  onClassSelect: (classCode: string) => void;
}

interface ChartData {
  name: string;
  value: number;
  classCode: string;
}

export function InteractionsBarChart({
  metrics,
  onClassSelect,
}: InteractionsBarChartProps) {
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

  const COLORS = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444"];

  const handleBarClick = (data: any) => {
    if (data && data.payload?.classCode) {
      onClassSelect(data.payload.classCode);
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
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              onClick={handleBarClick}
              layout="horizontal"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} />

              <Tooltip formatter={(value: number) => [`${value} conversas`, ""]} />
              <Legend />
              <Bar
                dataKey="value"
                name="Conversas"
                fill={COLORS[0]}
                cursor="pointer"
              />
            </BarChart>
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
