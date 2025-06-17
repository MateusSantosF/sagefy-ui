import { IClassMetric } from "@modules/dashboard/interfaces/IDashboard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@shared/components/ui/card";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface CategoryRadarChartProps {
  metrics: IClassMetric[];
  type: "categories" | "subcategories";
}

export function CategoryRadarChart({ metrics, type }: CategoryRadarChartProps) {
  if (!metrics || metrics.length === 0) {
    return (
      <Card className="border-none shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">
            {type === "categories" ? "Relevância de Categorias" : "Relevância de Subcategorias"}
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <p className="text-gray-500">Sem dados disponíveis</p>
        </CardContent>
      </Card>
    );
  }

  const field = type === "categories" ? "top_categories" : "top_subcategories";

  // Contar ocorrências de cada categoria/subcategoria
  const frequencyMap: Record<string, number> = {};
  metrics.forEach(metric => {
    (metric[field] || []).forEach(item => {
      const key = item.trim();
      frequencyMap[key] = (frequencyMap[key] || 0) + 1;
    });
  });

  // Determinar o valor máximo para fullMark
  const maxCount = Math.max(...Object.values(frequencyMap));

  // Construir dados para o gráfico
  const chartData = Object.entries(frequencyMap)
    .map(([label, count]) => ({
      subject: label,
      A: count,
      fullMark: maxCount,
    }))
    .sort((a, b) => b.A - a.A)
    .slice(0, 12); // opcional: limitar a top 12

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          {type === "categories" ? "Relevância de Categorias" : "Relevância de Subcategorias"}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid stroke="#e0e0e0" />
            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} stroke="#9ca3af" />
            <PolarRadiusAxis
              angle={30}
              domain={[0, maxCount]}
              tick={{ fontSize: 10 }}
              stroke="#9ca3af"
            />
            <Radar
              name={type === "categories" ? "Categoria" : "Subcategoria"}
              dataKey="A"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.6}
            />
            <Tooltip
              formatter={(value: number) => `${value}`}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
