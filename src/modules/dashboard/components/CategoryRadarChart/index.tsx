import { IClassMetric } from "@modules/dashboard/interfaces/IDashboard"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from "recharts"

interface CategoryRadarChartProps {
  metrics: IClassMetric[]
  type: "categories" | "subcategories"
}

export function CategoryRadarChart({ metrics, type }: CategoryRadarChartProps) {
  const latestMetric = [...metrics].sort((a, b) => {
    const dateA = new Date(a.timestamp || 0)
    const dateB = new Date(b.timestamp || 0)
    return dateB.getTime() - dateA.getTime()
  })[0]

  if (!latestMetric) {
    return (
      <Card  className="border-none shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">
            {type === "categories" ? "Relevância de Categorias" : "Relevância de Subcategorias"}
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <p className="text-gray-500">Sem dados disponíveis</p>
        </CardContent>
      </Card>
    )
  }

  // Parse categories or subcategories
  const field = type === "categories" ? "top_categories" : "top_subcategories"
  const items = latestMetric[field].map((item: string) => item.trim()) || []

  // Create data for radar chart
  const chartData = items.map((item: string, index: number) => ({
    subject: item,
    A: 100 - index * 15,
    fullMark: 100,
  }))

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
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} stroke="#9ca3af" />
            <Radar
              name={type === "categories" ? "Categoria" : "Subcategoria"}
              dataKey="A"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.6}
            />
            <Tooltip
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
  )
}

