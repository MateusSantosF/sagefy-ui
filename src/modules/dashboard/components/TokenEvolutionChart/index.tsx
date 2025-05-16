import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface TokenEvolutionChartProps {
  metrics: any[]
}

export function TokenEvolutionChart({ metrics }: TokenEvolutionChartProps) {
  const sortedMetrics = [...metrics].sort((a, b) => {
    const dateA = new Date(a.timestamp || 0)
    const dateB = new Date(b.timestamp || 0)
    return dateA.getTime() - dateB.getTime()
  })

  const chartData = sortedMetrics.map((metric) => {
    let date = new Date()
    try {
      date = new Date(metric.timestamp)
    } catch (e) {
      console.error("Error parsing date:", e)
    }

    return {
      date: date.toLocaleDateString(),
      promptTokens: metric.total_prompt_tokens || 0,
      completionTokens: metric.total_completion_tokens || 0,
      totalTokens: metric.total_tokens || 0,
    }
  })

  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Evolução Temporal de Tokens</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              formatter={(value) => [`${value.toLocaleString()} tokens`, ""]}
              labelFormatter={(label) => `Data: ${label}`}
            />
            <Legend verticalAlign="top" height={36} iconType="circle" />
            <Line
              type="monotone"
              dataKey="promptTokens"
              name="Prompt Tokens"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6, stroke: "#2563eb", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="completionTokens"
              name="Completion Tokens"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6, stroke: "#059669", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="totalTokens"
              name="Total Tokens"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6, stroke: "#7c3aed", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

