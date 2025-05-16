"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@shared/components/ui/card';
import { Button } from '@shared/components/ui/button';
import { Trash, Key } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { teacherService } from '@modules/teachers/services/teacher.service';

export function TeacherCard({ teacher, onDeactivated, onPasswordChanged }: any) {
  const [isChangingPw, setIsChangingPw] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const handleDeactivate = async () => {
    try {
      await teacherService.deactivateTeacher({ email: teacher.email });
      toast({ title: 'Sucesso', description: 'Professor desativado.' });
      onDeactivated(teacher.email);
    } catch (err: any) {
      toast({ title: 'Erro', description: err.response?.data?.error || 'Falha ao desativar.' });
      console.error(err);
    }
  };

  const handleChangePassword = async () => {
    try {
      await teacherService.changeTeacherPassword({
        teacherId: teacher.id,
        newPassword
      });
      toast({ title: 'Sucesso', description: 'Senha alterada.' });
      setIsChangingPw(false);
      setNewPassword('');
      onPasswordChanged?.(teacher.id);
    } catch (err: any) {
      toast({ title: 'Erro', description: err.response?.data?.error || 'Falha ao alterar senha.' });
      console.error(err);
    }
  };

  return (
    <Card>
      <CardContent className="flex flex-col justify-between p-4">
        <div>
          <h3 className="text-lg font-medium">{teacher.name || teacher.email}</h3>
          <p className="text-sm text-gray-500">{teacher.email}</p>
        </div>

        <div className="flex gap-2 mt-3">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => setIsChangingPw(true)}
          >
            <Key className="mr-2 h-4 w-4" />
            Alterar Senha
          </Button>

          <Button
            variant="destructive"
            size="sm"
            className="flex-1"
            onClick={handleDeactivate}
          >
            <Trash className="mr-2 h-4 w-4" />
            Desativar
          </Button>
        </div>

        {isChangingPw && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm">
              <h4 className="text-lg font-semibold mb-4">
                Nova senha para {teacher.name}
              </h4>
              <input
                type="password"
                placeholder="Digite a nova senha"
                className="w-full border rounded px-3 py-2 mb-4"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <Button
                  size="sm"
                  disabled={!newPassword}
                  onClick={handleChangePassword}
                >
                  Confirmar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsChangingPw(false);
                    setNewPassword('');
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
