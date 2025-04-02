"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@shared/components/ui/button";

import { useToast } from "@/hooks/use-toast";
import { classService } from "@modules/classManagement/services/class.service";
import { Label } from "@shared/components/ui/label";
import { Input } from "@shared/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shared/components/ui/dialog";

interface CreateClassModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClassCreated: () => void;
}

export function CreateClassModal({
  open,
  onOpenChange,
  onClassCreated,
}: CreateClassModalProps) {
  const [classCode, setClassCode] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [className, setClassName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!classCode || !accessCode) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await classService.createClass({
        classCode,
        accessCode,
        className,
        students: [],
      });

      toast({
        title: "Success",
        description: `Class ${classCode} has been created successfully.`,
      });

      onClassCreated();
      setClassCode("");
      setAccessCode("");
    } catch (error) {
      console.error("Failed to create class:", error);
      toast({
        title: "Error",
        description: "Failed to create class. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Criar nova turma</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="classCode">Nome da turma</Label>
              <Input
                id="className"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="ex: 3º ano A"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="classCode">Código da turma</Label>
              <Input
                id="classCode"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
                placeholder="ex: BCCCALC022024"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="accessCode">Código de acesso</Label>
              <Input
                id="accessCode"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="e.g. 40028922"
              />
              <p className="text-xs text-gray-500">
                Este código será usado para os alunos acessarem o chatbot.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full"
            >
              {isSubmitting ? "Criando..." : "Criar turma"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
