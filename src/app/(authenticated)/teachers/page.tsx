"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@shared/components/ui/button';
import { Card, CardContent } from '@shared/components/ui/card';
import { Plus } from 'lucide-react';
import { teacherService } from '@modules/teachers/services/teacher.service';
import { TeacherCard } from '@modules/teachers/components/TeacherCard';
import { CreateTeacherModal } from '@modules/teachers/components/CreateTeacherModal';


export default function TeachersPage() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    setIsLoading(true);
    try {
      const data = await teacherService.getAllTeachers();
      setTeachers(data.teachers || []);
    } catch (error) {
      console.error('Erro ao buscar professores:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTeacherCreated = () => {
    fetchTeachers();
    setIsModalOpen(false);
  };

  const handleTeacherDeactivated = (email: string) => {
    setTeachers(prev => prev.filter(t => t.email !== email));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between pb-6">
        <h1 className="text-2xl font-bold">Professores</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Professor
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="h-32 animate-pulse">
              <CardContent className="p-4">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : teachers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Nenhum professor cadastrado.</p>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Cadastrar Professor
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map(teacher => (
            <TeacherCard
              key={teacher.email}
              teacher={teacher}
              onDeactivated={handleTeacherDeactivated}
            />
          ))}
        </div>
      )}

      <CreateTeacherModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onTeacherCreated={handleTeacherCreated}
      />
    </div>
  );
}