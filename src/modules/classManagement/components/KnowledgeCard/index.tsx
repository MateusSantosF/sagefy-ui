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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { Card } from "@shared/components/ui/card";
import { Badge } from "@shared/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@shared/components/ui/dropdown-menu";
import { Label } from "@shared/components/ui/label";

const MAX_FILE_SIZE = 25; // em MB

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const buffer = reader.result as ArrayBuffer;
      let binary = "";
      const bytes = new Uint8Array(buffer);
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      resolve(window.btoa(binary));
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });

export interface KnowledgeResourcesProps {
  classCode?: string;
}

export function KnowledgeResources({ classCode }: KnowledgeResourcesProps) {
  const [resources, setResources] = useState<IResource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchResources();
  }, [classCode]);

  const fetchResources = async () => {
    setIsLoading(true);
    try {
      const response = await knowledgeService.getResources(classCode);
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

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > MAX_FILE_SIZE * 1024 * 1024) {
          toast({
            title: "Arquivo grande",
            description: `${file.name} excede ${MAX_FILE_SIZE}MB`,
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
        toast({ title: "Sucesso", description: `${file.name} adicionado.` });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro",
        description: "Falha ao adicionar arquivo.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      fetchResources();
    }
  };

  const handleDeleteResource = async (resource: IResource) => {
    const { original_name } = resource.metadata;
    const { class_code, file_id } = resource.metadata;
    if (!file_id) {
      toast({
        title: "Erro",
        description: "ID não encontrado.",
        variant: "destructive",
      });
      return;
    }
    setDeletingId(file_id);
    try {
      const res = await knowledgeService.deleteResource({
        classCode: class_code,
        fileId: file_id,
        fileName: original_name,
      });
      if (res.success) {
        setResources((prev) =>
          prev.filter((r) => r.metadata.file_id !== file_id)
        );
        toast({ title: "Removido", description: `${original_name} removido.` });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro",
        description: "Falha ao remover arquivo.",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
      fetchResources();
    }
  };

  const filteredResources = resources.filter((r) =>
    r.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getExtension = (name: string) => name.split(".").pop() || "";
  const getIcon = (name: string) => {
    const ext = getExtension(name).toLowerCase();
    switch (ext) {
      case "pdf":
        return <FilePdf className="h-8 w-8 text-red-500" />;
      case "doc":
      case "docx":
        return <FileText className="h-8 w-8 text-blue-500" />;
      case "xls":
      case "xlsx":
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
    <div className="flex flex-col h-full">
      <Tabs defaultValue="browse" className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-2 ">
          <TabsTrigger className="py-2 px-3" value="browse">
            Procurar arquivos
          </TabsTrigger>
          <TabsTrigger className="py-2 px-3" value="upload">
            Adicionar arquivos
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="browse"
          className="flex-1 flex flex-col overflow-hidden"
        >
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 bg-white text-gray-400" />
            <Input
              placeholder="Buscar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 py-2 bg-white"
            />
          </div>
          <ScrollArea className="border rounded py-4 min-h-[300px]">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="animate-spin h-8 w-8 text-primary" />
                <span className="ml-2 text-gray-500">Carregando...</span>
              </div>
            ) : filteredResources.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <FileText className="h-12 w-12 text-gray-300 mb-2" />
                <p className="text-gray-500 mb-2">Nenhum arquivo encontrado.</p>
                {searchQuery && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery("")}
                  >
                    Limpar
                  </Button>
                )}
              </div>
            ) : (
              <div className="p-4 space-y-3 flex-1 overflow-auto">
                <AnimatePresence>
                  {filteredResources.map((res) => (
                    <motion.div
                      key={res.metadata.file_id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="flex items-center p-4">
                        {getIcon(res.name)}
                        <div className="ml-4 flex-1 min-w-0">
                          <p className="font-medium truncate">
                            {res.metadata.original_name}
                          </p>
                          <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                            <Badge variant="outline">
                              {getExtension(res.name)}
                            </Badge>
                            <span>
                              {new Date(res.uploadedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <svg
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <circle cx="12" cy="5" r="1" />
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="12" cy="19" r="1" />
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => window.open(res.url, "_blank")}
                              className="flex items-center gap-2"
                            >
                              <Download className="h-4 w-4" /> Download
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteResource(res)}
                              disabled={deletingId === res.metadata.file_id}
                              className="flex items-center gap-2 text-red-500"
                            >
                              {deletingId === res.metadata.file_id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}{" "}
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </ScrollArea>
          <p className="text-xs text-red-500 text-right mt-2">
            *Arquivos com mesmo nome serão atualizados.
          </p>
        </TabsContent>

        <TabsContent
          value="upload"
          className="flex-1 flex flex-col items-center justify-center overflow-hidden"
        >
          <div
            className={`w-full h-full flex flex-col items-center justify-center border-2 border-dashed rounded p-8 transition-colors ${
              dragActive ? "border-primary bg-primary/5" : "border-gray-300"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setDragActive(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              handleFileUpload(e.dataTransfer.files);
            }}
          >
            {isUploading ? (
              <>
                <Loader2 className="animate-spin h-12 w-12 text-primary mb-4" />
                <p className="text-lg font-medium">Uploading...</p>
                <p className="text-gray-500">Aguarde...</p>
              </>
            ) : (
              <>
                <Upload className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  Arraste e solte arquivos
                </h3>
                <p className="text-gray-500 text-center mb-6">
                  ou clique abaixo. Máx: {MAX_FILE_SIZE}MB
                </p>
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded hover:bg-primary/90">
                    <Plus className="h-4 w-4" /> Selecionar
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
    </div>
  );
}

export interface KnowledgeResourcesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classCode: string;
}

export function KnowledgeResourcesModal({
  open,
  onOpenChange,
  classCode,
}: KnowledgeResourcesModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <FileText className="h-5 w-5" /> Base de conhecimento
          </DialogTitle>
          <DialogDescription>
            Adicione conteúdos para o chatbot responder perguntas.
          </DialogDescription>
        </DialogHeader>
        <KnowledgeResources classCode={classCode} />
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
