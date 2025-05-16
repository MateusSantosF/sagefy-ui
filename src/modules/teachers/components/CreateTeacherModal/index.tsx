"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from '@shared/components/ui/dialog';
import { Button } from '@shared/components/ui/button';
import { Input } from '@shared/components/ui/input';
import { Label } from '@shared/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { teacherService } from '@modules/teachers/services/teacher.service';

export function CreateTeacherModal({
  open,
  onOpenChange,
  onTeacherCreated,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTeacherCreated: () => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await teacherService.createTeacher({ email, password, name });
      toast({ title: 'Sucesso', description: 'Professor cadastrado.' });
      onTeacherCreated();
      setEmail('');
      setPassword('');
      setName('');
    } catch (err: any) {
      toast({
        title: 'Erro',
        description: err.response?.data?.error || 'Falha ao cadastrar.',
      });
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Professor</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <div>
            <Label htmlFor="teacher-name">Nome</Label>
            <Input
              id="teacher-name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="teacher-email">Email</Label>
            <Input
              id="teacher-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="teacher-password">Senha</Label>
            <Input
              id="teacher-password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full">
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}