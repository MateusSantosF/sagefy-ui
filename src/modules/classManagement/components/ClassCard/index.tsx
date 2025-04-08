"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@shared/components/ui/card";

import { BookOpen, Edit, Eye, EyeOff, Trash2, Users } from "lucide-react";
import { IClass } from "@modules/classManagement/interfaces/IClass";
import { Button } from "@shared/components/ui/button";
import { EditClassModal } from "../EditClassModal";
import { DeleteClassModal } from "../DeleteClassModal";
import { ManageStudentsModal } from "../ManageStudentsModal";
import { Badge } from "@shared/components/ui/badge";
import { KnowledgeResourcesModal } from "../KnowledgeCard";

interface ClassCardProps {
  classItem: IClass;
  onDeleted: (classCode: string) => void;
  onUpdated: () => void;
}

export function ClassCard({ classItem, onDeleted, onUpdated }: ClassCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showAccessCode, setShowAccessCode] = useState(false);
  const [isManageStudentsModalOpen, setIsManageStudentsModalOpen] =
    useState(false);
  const [isKnowledgeModalOpen, setIsKnowledgeOpen] = useState(false);

  const studentCount =
    classItem.studentCount ||
    (classItem.students
      ? typeof classItem.students === "string"
        ? JSON.parse(classItem.students).length
        : classItem.students.length
      : 0);

  return (
    <>
      <Card className="h-full flex flex-col overflow-hidden">
        <CardContent className="flex-grow p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold">{classItem.className}</h3>
            <Badge variant="outline">
              {studentCount} {studentCount === 1 ? "estudante" : "estudantes"}
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Código da turma:
              </span>
              <span className="font-medium">{classItem.classCode}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Código de acesso:
              </span>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAccessCode(!showAccessCode)}
                  className="flex items-center gap-2"
                >
                  {showAccessCode ? (
                    <>
                      <EyeOff size={16} />
                      <pre className="font-mono  text-sm overflow-auto">
                        {classItem.accessCode}
                      </pre>
                    </>
                  ) : (
                    <>
                      <Eye size={16} />
                      Mostrar Código
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t border-gray-200 flex-wrap flex dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50 gap-2">
          <Button
            variant="outline"
            size="sm"
            className=" text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 border-red-200 dark:border-red-800/30"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditModalOpen(true)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => setIsManageStudentsModalOpen(true)}
          >
            <Users className="h-4 w-4 mr-1" />
            Alunos
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => setIsKnowledgeOpen(true)}
          >
            <BookOpen className="h-4 w-4 mr-1" />
            Conhecimento
          </Button>
        </CardFooter>
      </Card>

      <EditClassModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        classItem={classItem}
        onClassUpdated={onUpdated}
      />

      <DeleteClassModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        classCode={classItem.classCode}
        onClassDeleted={() => onDeleted(classItem.classCode)}
      />

      <ManageStudentsModal
        open={isManageStudentsModalOpen}
        onOpenChange={setIsManageStudentsModalOpen}
        classCode={classItem.classCode}
        onStudentsUpdated={onUpdated}
      />

      <KnowledgeResourcesModal
        classCode={classItem.classCode}
        open={isKnowledgeModalOpen}
        onOpenChange={setIsKnowledgeOpen}
      />
    </>
  );
}
