"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@shared/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { X, Search, UserPlus, Loader2 } from "lucide-react"
import { IClass } from "@modules/classManagement/interfaces/IClass"
import { classService } from "@modules/classManagement/services/class.service"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/components/ui/tabs"
import { Input } from "@shared/components/ui/input"
import { Button } from "@shared/components/ui/button"
import { Textarea } from "@shared/components/ui/textarea"

interface ManageStudentsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  classCode: string
  onStudentsUpdated: () => void
}

export function ManageStudentsModal({ open, onOpenChange, classCode, onStudentsUpdated }: ManageStudentsModalProps) {
  const [classDetails, setClassDetails] = useState<IClass | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [emails, setEmails] = useState("")
  const [isAdding, setIsAdding] = useState(false)
  const [filter, setFilter] = useState("")
  const [removingEmail, setRemovingEmail] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (open) {
      fetchDetails()
    }
  }, [open, classCode])

  const fetchDetails = async () => {
    setIsLoading(true)
    try {
      const response = await classService.getClassDetails(classCode)
      setClassDetails(response.data)
    } catch (error) {
      console.error("Failed to fetch class details:", error)
      toast({
        title: "Error",
        description: "Failed to load class details. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddStudents = async () => {
    if (!emails.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter at least one email address.",
        variant: "destructive",
      })
      return
    }

    const emailList = emails
      .split(/[\n,;]/)
      .map((email) => email.trim())
      .filter((email) => email.length > 0)

    if (emailList.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please enter valid email addresses.",
        variant: "destructive",
      })
      return
    }

    setIsAdding(true)

    try {
      await classService.addStudents({
        classCode,
        emails: emailList,
      })

      toast({
        title: "Success",
        description: `${emailList.length} student(s) added to class ${classCode}.`,
      })

      fetchDetails()
      onStudentsUpdated()
      setEmails("")
    } catch (error) {
      console.error("Failed to add students:", error)
      toast({
        title: "Error",
        description: "Failed to add students. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAdding(false)
    }
  }

  const handleRemoveStudent = async (email: string) => {
    setRemovingEmail(email)
    try {
      await classService.removeStudent({
        email,
        classCode,
      })

      toast({
        title: "Success",
        description: `Student ${email} removed from class ${classCode}.`,
      })

      fetchDetails()
      onStudentsUpdated()
    } catch (error) {
      console.error("Failed to remove student:", error)
      toast({
        title: "Error",
        description: "Failed to remove student. Please try again.",
        variant: "destructive",
      })
    } finally {
      setRemovingEmail(null)
    }
  }

  const getStudentsList = () => {
    if (!classDetails) return []

    if (!classDetails.students) return []

    if (typeof classDetails.students === "string") {
      try {
        return JSON.parse(classDetails.students)
      } catch {
        return []
      }
    }

    return classDetails.students
  }

  const filteredStudents = getStudentsList().filter((email: string) =>
    email.toLowerCase().includes(filter.toLowerCase()),
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">Gerenciar alunos</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="list" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="list">Alunos</TabsTrigger>
            <TabsTrigger value="add">Adicionar Alunos</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="flex-1 overflow-hidden flex flex-col">
            <div className="mb-4 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Pesquisar por e-mail"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="flex-1 overflow-y-auto border rounded-md">
              {isLoading ? (
                <div className="flex items-center justify-center h-full p-8">
                  <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                  <span className="ml-2 text-gray-500">Carregando estudantes</span>
                </div>
              ) : filteredStudents.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <p className="text-gray-500 mb-2">
                    {filter ? "Nenhum estudante encontrado com os filtros aplicados." : "Nenhum estudante cadastrado nesta turma ainda."}
                  </p>
                  {filter && (
                    <Button variant="outline" size="sm" onClick={() => setFilter("")}>
                      Limpar filtro
                    </Button>
                  )}
                </div>
              ) : (
                <div className="p-4 space-y-2">
                  {filteredStudents.map((email: string) => (
                    <div
                      key={email}
                      className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded-md"
                    >
                      <span className="truncate flex-1">{email}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveStudent(email)}
                        disabled={removingEmail === email}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                      >
                        {removingEmail === email ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="add" className="flex-1 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <Textarea
                    placeholder="Insira os e-mails dos alunos (um por linha ou separados por vírgula)"
                    value={emails}
                    onChange={(e) => setEmails(e.target.value)}
                    className="min-h-[200px] resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Insira vários e-mails separados por quebras de linha, vírgulas ou ponto e vírgula.
                  </p>
                </div>

                <Button onClick={handleAddStudents} disabled={isAdding} className="w-full">
                  {isAdding ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adicionando...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Adicionar alunos
                    </>
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

