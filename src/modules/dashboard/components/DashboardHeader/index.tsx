import { BarChart3 } from "lucide-react"

export function DashboardHeader() {
  return (
    <div className=" bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center">
      <div className="flex items-center gap-2 mx-auto md:mx-6">
        <BarChart3 className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold">Painel de Métricas</h1>
      </div>
    </div>
  )
}

