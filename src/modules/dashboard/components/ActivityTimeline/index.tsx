import { IClassMetric } from "@modules/dashboard/interfaces/IDashboard"
import { Badge } from "@shared/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@shared/components/ui/table"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface ActivityTimelineProps {
  metrics: IClassMetric[]
}

export function ActivityTimeline({ metrics }: ActivityTimelineProps) {
  // Sort metrics by timestamp (newest first)
  const sortedMetrics = [...metrics].sort((a, b) => {
    const dateA = new Date(a.timestamp || 0)
    const dateB = new Date(b.timestamp || 0)
    return dateB.getTime() - dateA.getTime()
  })

  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Tabela de Atividades por Data</CardTitle>
      </CardHeader>
      <CardContent>
        {sortedMetrics.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Turma</TableHead>
                  <TableHead>Conversas</TableHead>
                  <TableHead>Tokens</TableHead>
                  <TableHead>Categorias</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedMetrics.map((metric, index) => {
                  const date = new Date(metric.timestamp)
                  const isValidDate = !isNaN(date.getTime())

                  // Get first 3 categories
                  const categories =
                    metric.top_categories
                      ?.split(",")
                      .map((cat: string) => cat.trim())
                      .slice(0, 3) || []

                  // Alternate row colors
                  const rowClass = index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800/50" : ""

                  return (
                    <TableRow key={metric.RowKey} className={rowClass}>
                      <TableCell className="font-medium">
                        {isValidDate ? format(date, "PPp", { locale: ptBR }) : "Data não disponível"}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="rounded-full">
                          {metric.class_code || metric.PartitionKey}
                        </Badge>
                      </TableCell>
                      <TableCell>{metric.total_conversations || 0}</TableCell>
                      <TableCell>{metric.total_tokens?.toLocaleString() || 0}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {categories.map((category: string) => (
                            <Badge key={category} variant="secondary" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[200px]">
            <p className="text-gray-500">Sem dados de atividade disponíveis</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

