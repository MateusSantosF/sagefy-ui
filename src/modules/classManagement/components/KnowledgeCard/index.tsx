"use client";

import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  FileText,
  Upload,
  Trash2,
  File,
  FileImage,
  FileIcon as FilePdf,
  FileArchive,
  FileSpreadsheet,
  Loader2,
  Download,
  Search,
  Plus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { IResource } from "@modules/classManagement/interfaces/IKnowledge";
import { knowledgeService } from "@modules/classManagement/services/knowledge.service";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shared/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@shared/components/ui/tabs";
import { Input } from "@shared/components/ui/input";
import { ScrollArea } from "@shared/components/ui/scroll-area";
import { Button } from "@shared/components/ui/button";
import { Card, CardContent } from "@shared/components/ui/card";
import { Badge } from "@shared/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@shared/components/ui/dropdown-menu";
import { Label } from "@shared/components/ui/label";

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // O resultado vem como ArrayBuffer
      const buffer = reader.result as ArrayBuffer;
      let binary = "";
      const bytes = new Uint8Array(buffer);
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      // Converte a string binária para base64
      const base64String = window.btoa(binary);
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });

interface KnowledgeResourcesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classCode: string;
}


const MAX_FILE_SIZE = 25;

export function KnowledgeResourcesModal({
  open,
  onOpenChange,
  classCode,
}: KnowledgeResourcesModalProps) {
  const [resources, setResources] = useState<IResource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      fetchResources();
    }
  }, [open, classCode]);

  const fetchResources = async () => {
    setIsLoading(true);
    try {
      const response = await knowledgeService.getResources(classCode);
      // Pressupõe-se que a resposta contenha uma propriedade "files"
      setResources(response.files || []);
    } catch (error) {
      console.error("Failed to fetch resources:", error);
      toast({
        title: "Error",
        description: "Failed to load knowledge resources. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > MAX_FILE_SIZE * 1024 * 1024) {
          toast({
            title: "Arquivo muito grande",
            description: `${file.name} excede o tamanho máximo de ${MAX_FILE_SIZE}MB.`,
            variant: "destructive",
          });
          continue;
        }

        const data = {
          class_code: classCode,
          fileName: file.name,
          fileContent: await toBase64(file),
        };
        await knowledgeService.uploadResource(data);
        toast({
          title: "Sucesso",
          description: `${file.name} foi adicionado com sucesso.`,
        });
      }
    } catch (error) {
      console.error("Failed to upload file:", error);
      toast({
        title: "Erro ao adicionar arquivo",
        description: "Erro ao adicionar arquivo. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      fetchResources()
    }
  };

  const handleDeleteResource = async (resource: IResource) => {
    const fileName = resource.name;
    const classCode = resource.metadata.class_code;
    const fileId = resource.metadata.file_id;
    if (!fileName || !fileId) {
      toast({
        title: "Erro ao deletar arquivo",
        description:
          "Identificador do arquivo não encontrado. Entre em contato com um administrador.",
        variant: "destructive",
      });
      return;
    }

    setDeletingId(fileName);

    try {
      const response = await knowledgeService.deleteResource({
        classCode,
        fileId: fileId,
        fileName,
      });
      if (response.success) {
        setResources((prev) =>
          prev.filter((res) => res.metadata.file_id !== fileName)
        );
        toast({
          title: "Arquivo removido",
          description: "Arquivo removido com sucesso.",
        });
      }
    } catch (error) {
      console.error("Failed to delete resource:", error);
      toast({
        title: "Error",
        description: "Erro ao remover arquivo. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
      fetchResources()
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const filteredResources = resources?.filter((resource) => {
    if (!searchQuery) return true;
    if (resource?.name === undefined) return false;
    return resource.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getFileExtension = (fileName: string) => {
    const parts = fileName.split(".");
    return parts.length > 1 ? parts[parts.length - 1] : "";
  };

  const getFileIcon = (file_name: string) => {
    const extension = getFileExtension(file_name);
    switch (extension.toLowerCase()) {
      case "pdf":
        return <FilePdf className="h-8 w-8 text-red-500" />;
      case "doc":
      case "docx":
        return <FileText className="h-8 w-8 text-blue-500" />;
      case "xls":
      case "xlsx":
      case "excel":
        return <FileSpreadsheet className="h-8 w-8 text-green-500" />;
      case "zip":
      case "rar":
        return <FileArchive className="h-8 w-8 text-amber-500" />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <FileImage className="h-8 w-8 text-purple-500" />;
      default:
        return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Base de conhecimento da turma
          </DialogTitle>
          <DialogDescription>
            Nesta área você pode adicionar arquivos com os conteúdos que você deseja que o chatbot utilize para responder perguntas. Você pode adicionar arquivos de texto, DOCX, PDFs e Markdown.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="browse"
          className="flex-1 overflow-hidden flex flex-col"
        >
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="browse">Procurar arquivos</TabsTrigger>
            <TabsTrigger value="upload">Adicionar arquivos</TabsTrigger>
          </TabsList>

          <TabsContent
            value="browse"
            className="flex-1 overflow-hidden flex flex-col"
          >
            <div className="mb-4 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <ScrollArea className=" h-[300px] py-4 rounded-md border">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2 text-gray-500">
                    Carregando arquivos
                  </span>
                </div>
              ) : filteredResources.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <FileText className="h-12 w-12 text-gray-300 mb-2" />
                  <p className="text-gray-500 mb-2">
                    {searchQuery
                      ? "Nenhum arquivo encontrado com esse nome."
                      : "Nenhum arquivo encontrado."}
                  </p>
                  {searchQuery && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSearchQuery("")}
                    >
                      Limpar busca
                    </Button>
                  )}
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  <AnimatePresence>
                    {filteredResources.map((resource, _) => (
                      <motion.div
                        key={resource.metadata.file_id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Card className="overflow-hidden w-full flex-1">
                          <CardContent className="p-0 flex-1 w-full">
                            <div className="flex items-center p-4">
                              <div className="mr-4 flex-shrink-0">
                                {getFileIcon(resource.name)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">
                                  {resource.metadata.original_name}
                                </p>
                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                  <Badge variant="outline" className="mr-2">
                                    {getFileExtension(resource.name)}
                                  </Badge>
                                  <span>
                                    {new Date(
                                      resource.uploadedAt
                                    ).toLocaleDateString(undefined, {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    })}
                                  </span>
                                </div>
                              </div>
                              <div className="ml-4 flex-shrink-0">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4"
                                      >
                                        <circle cx="12" cy="12" r="1" />
                                        <circle cx="12" cy="5" r="1" />
                                        <circle cx="12" cy="19" r="1" />
                                      </svg>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      className="flex items-center cursor-pointer"
                                      onClick={() =>
                                        window.open(resource.url, "_blank")
                                      }
                                    >
                                      <Download className="mr-2 h-4 w-4" />
                                      <span>Download</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="flex items-center text-red-500 focus:text-red-500 cursor-pointer"
                                      onClick={() =>
                                        handleDeleteResource(resource)
                                      }
                                      disabled={
                                        deletingId === resource.metadata.file_id
                                      }
                                    >
                                      {deletingId ===
                                      resource.metadata.file_id ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                      ) : (
                                        <Trash2 className="mr-2 h-4 w-4" />
                                      )}
                                      <span>Delete</span>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </ScrollArea>
            <p className="text-xs text-red-500 text-end">*Atenção, arquivos com o mesmo nome serão atualizados. Não duplicados.</p>

          </TabsContent>

          <TabsContent
            value="upload"
            className="flex-1 overflow-hidden flex flex-col"
          >
            <div
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 h-[400px] transition-colors ${
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-gray-300 dark:border-gray-700"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {isUploading ? (
                <div className="text-center">
                  <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">Uploading...</p>
                  <p className="text-gray-500">
                    Please wait while your files are being uploaded.
                  </p>
                </div>
              ) : (
                <>
                  <Upload className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Arraste e solte arquivos aqui
                  </h3>
                  <p className="text-gray-500 text-center mb-6">
                    ou clique no botão abaixo para selecionar arquivos do seu
                    computador.
                    <br />
                    Tamanho máximo por arquivo: 10MB
                  </p>
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <div className="flex items-center justify-center py-2 px-4 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors">
                      <Plus className="h-4 w-4 mr-2" />
                      Selecionar arquivos
                    </div>
                    <Input
                      id="file-upload"
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => handleFileUpload(e.target.files)}
                    />
                  </Label>
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
