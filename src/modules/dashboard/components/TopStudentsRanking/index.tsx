
import { Badge } from "@shared/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card";
import { ScrollArea } from "@shared/components/ui/scroll-area";
import { User } from "lucide-react"

interface TopStudentsRankingProps {
  metrics: any[]
}

export function TopStudentsRanking({ metrics }: TopStudentsRankingProps) {
  const studentData: { email: string; count: number }[] = []
  metrics.forEach((metric) => {
    if (metric.top_students) {
      try {
        const students = metric.top_students
        students.forEach((student: { email: string; count: number }) => {
          const existingStudent = studentData.find((s) => s.email === student.email)
          if (existingStudent) {
            existingStudent.count += student.count
          } else {
            studentData.push({ ...student })
          }
        })
      } catch (e) {
        console.error("Error processing top students:", e)
      }
    }
  })

  studentData.sort((a, b) => b.count - a.count)
  const medals = ["🥇", "🥈", "🥉"]

  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Alunos com mais interações</CardTitle>
      </CardHeader>
      <CardContent>
        {studentData.length > 0 ? (
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-3">
              {studentData.map((student, index) => (
                <div key={student.email} className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary mr-3">
                    {index < 3 ? <span className="text-lg">{medals[index]}</span> : <User className="h-5 w-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{student.email}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {student.count} {student.count === 1 ? "interação" : "interações"}
                    </p>
                  </div>
                  <Badge
                    className={
                      index < 3
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 border-0"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-0"
                    }
                  >
                    #{index + 1}
                  </Badge>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex items-center justify-center h-[300px]">
            <p className="text-gray-500">Sem dados de alunos disponíveis</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

