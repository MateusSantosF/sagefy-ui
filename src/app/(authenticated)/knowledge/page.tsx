"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@shared/components/ui/button";
import { Card, CardContent } from "@shared/components/ui/card";
import { Plus } from "lucide-react";
import { teacherService } from "@modules/teachers/services/teacher.service";
import { TeacherCard } from "@modules/teachers/components/TeacherCard";
import { CreateTeacherModal } from "@modules/teachers/components/CreateTeacherModal";
import { useToast } from "@/hooks/use-toast";
import { IResource } from "@modules/classManagement/interfaces/IKnowledge";
import { knowledgeService } from "@modules/classManagement/services/knowledge.service";
import { KnowledgeResources } from "@modules/classManagement/components/KnowledgeCard";

export default function KnowledgePage() {
  const [resources, setResources] = useState<IResource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    setIsLoading(true);
    try {
      const response = await knowledgeService.getResources();
      setResources(response.files || []);
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro",
        description: "Falha ao carregar recursos.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between pb-6">
        <h1 className="text-2xl font-bold">Conhecimento</h1>
      </div>
      <KnowledgeResources />
    </div>
  );
}
