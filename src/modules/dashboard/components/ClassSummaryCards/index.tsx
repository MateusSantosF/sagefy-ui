
import { IClassMetric } from "@modules/dashboard/interfaces/IDashboard"
import { Badge } from "@shared/components/ui/badge"
import { Card, CardContent } from "@shared/components/ui/card"
import { MessageSquare, Zap } from "lucide-react"

interface ClassSummaryCardsProps {
  metrics: IClassMetric[]
  classCode: string | null
}

export function ClassSummaryCards({ metrics, classCode }: ClassSummaryCardsProps) {
  // Calculate totals from all metrics entries
  const totalConversations = metrics.reduce((sum, metric) => sum + (metric.total_conversations || 0), 0)
  const totalPromptTokens = metrics.reduce((sum, metric) => sum + (metric.total_prompt_tokens || 0), 0)
  const totalCompletionTokens = metrics.reduce((sum, metric) => sum + (metric.total_completion_tokens || 0), 0)
  const totalTokens = metrics.reduce((sum, metric) => sum + (metric.total_tokens || 0), 0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      <Card className="rounded-2xl shadow-md overflow-hidden">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold">Turma {classCode}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Resumo de atividades</p>
            </div>
            <Badge variant="outline" className="rounded-full">
              {metrics.length} registros
            </Badge>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="h-5 w-5 text-blue-500" />
            <span className="font-medium">Total de Conversas:</span>
            <span className="font-bold text-lg">{totalConversations}</span>
          </div>

          <div className="space-y-1 pt-6 mb-4">
            <div className="flex justify-between text-md">
              <span>Prompt Tokens:</span>
              <span className="font-medium">{totalPromptTokens.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-md">
              <span>Completion Tokens:</span>
              <span className="font-medium">{totalCompletionTokens.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-md overflow-hidden">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold">Uso de Tokens</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Distribuição de consumo</p>
            </div>
            <Zap className="h-5 w-5 text-yellow-500" />
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Prompt Tokens</span>
                <span className="text-sm font-medium">{Math.round((totalPromptTokens / totalTokens) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${Math.round((totalPromptTokens / totalTokens) * 100)}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Completion Tokens</span>
                <span className="text-sm font-medium">{Math.round((totalCompletionTokens / totalTokens) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-green-500 h-2.5 rounded-full"
                  style={{ width: `${Math.round((totalCompletionTokens / totalTokens) * 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Tokens</span>
                <span className="text-xl font-bold">{totalTokens.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}

