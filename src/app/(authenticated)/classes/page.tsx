"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { IClass } from "@modules/classManagement/interfaces/IClass";
import { Card, CardContent } from "@shared/components/ui/card";
import { Button } from "@shared/components/ui/button";
import { CreateClassModal } from "@modules/classManagement/components/CreateClassModal";
import { ClassCard } from "@modules/classManagement/components/ClassCard";
import { classService } from "@modules/classManagement/services/class.service";

export default function ClassesPage() {
  const [classes, setClasses] = useState<IClass[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    setIsLoading(true);
    try {
      const response = await classService.getAllClasses();
      setClasses(response.classes);
    } catch (error) {
      console.error("Failed to fetch classes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClassCreated = () => {
    fetchClasses();
    setIsCreateModalOpen(false);
  };

  const handleClassDeleted = (classCode: string) => {
    setClasses(classes.filter((c) => c.classCode !== classCode));
  };

  return (
    <>
      <div className="p-6">
        <div className="flex gap-4 flex-wrap justify-between pb-6">
          <h1 className="text-2xl font-bold">Minhas turmas</h1>
          <Button
            className="ml-auto"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Criar turma
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-48 animate-pulse">
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : classes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Você ainda não tem nenhuma turma.
            </p>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Criar turma
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((classItem) => (
              <ClassCard
                key={classItem.classCode}
                classItem={classItem}
                onDeleted={handleClassDeleted}
                onUpdated={fetchClasses}
              />
            ))}
          </div>
        )}
      </div>

      <CreateClassModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onClassCreated={handleClassCreated}
      />
    </>
  );
}
