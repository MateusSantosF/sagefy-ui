"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@shared/components/ui/dialog"

import { useToast } from "@/hooks/use-toast"
import { AlertTriangle } from "lucide-react"
import { Button } from "@shared/components/ui/button"
import { classService } from "@modules/classManagement/services/class.service"

interface DeleteClassModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  classCode: string
  onClassDeleted: () => void
}

export function DeleteClassModal({ open, onOpenChange, classCode, onClassDeleted }: DeleteClassModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleDelete = async () => {
    setIsSubmitting(true)

    try {
      await classService.deleteClass(classCode)

      toast({
        title: "Sucesso",
        description: `Turma ${classCode} foi removida com sucesso.`,
      })

      onClassDeleted()
      onOpenChange(false)
    } catch (error) {
      console.error("Failed to delete class:", error)
      toast({
        title: "Erro",
        description: "Tivemos um imprevisto. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col items-center gap-2">
          <AlertTriangle className="h-12 w-12 text-red-500" />
          <DialogTitle className="text-xl">Confirmar remoção</DialogTitle>
          <DialogDescription className="text-center">
            Você tem certeza que deseja remover essa turma? Essa ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
        
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? "Removendo" : "Confirmar remoção"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="sm:mr-2 w-full sm:w-auto"
          >
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

