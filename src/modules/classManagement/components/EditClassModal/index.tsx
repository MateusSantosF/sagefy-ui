"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@shared/components/ui/dialog"

import { useToast } from "@/hooks/use-toast"
import { classService } from "@modules/classManagement/services/class.service"
import { Label } from "@shared/components/ui/label"
import { Input } from "@shared/components/ui/input"
import { Button } from "@shared/components/ui/button"
import { IClass } from "@modules/classManagement/interfaces/IClass"

interface EditClassModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  classItem: IClass
  onClassUpdated: () => void
}

export function EditClassModal({ open, onOpenChange, classItem, onClassUpdated }: EditClassModalProps) {
  const [accessCode, setAccessCode] = useState(classItem.accessCode)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [className, setClassName] = useState(classItem.className);
  const { toast } = useToast()

  useEffect(() => {
    if (open) {
      setAccessCode(classItem.accessCode)
    }
  }, [open, classItem])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!accessCode) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await classService.updateClass({
        classCode: classItem.classCode,
        accessCode,
        className,
      })

      toast({
        title: "Success",
        description: `Class ${classItem.classCode} has been updated successfully.`,
      })

      onClassUpdated()
      onOpenChange(false)
    } catch (error) {
      console.error("Failed to update class:", error)
      toast({
        title: "Error",
        description: "Failed to update class. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Editar detalhes da turma</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="classCode">Código da turma</Label>
              <Input id="classCode" value={classItem.classCode} disabled className="bg-gray-100 dark:bg-gray-800" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="accessCode">Nome da turma</Label>
              <Input id="accessCode" value={className} onChange={(e) => setClassName(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="accessCode">Código de acesso</Label>
              <Input id="accessCode" value={accessCode} onChange={(e) => setAccessCode(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="rounded-full">
              {isSubmitting ? "Salvando..." : "Salvar alterações"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

