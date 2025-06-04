"use client";

import { Suspense, useState } from "react";
import { motion } from "framer-motion";
import { Book, GraduationCap, UserCog } from "lucide-react";

import StudentLoginForm from "@/modules/auth/components/StudentLoginForm";
import StaffLoginForm from "@/modules/auth/components/StaffLoginForm";
import { Card, CardContent } from "@shared/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@shared/components/ui/tabs";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"student" | "staff">("student");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left side - Illustration and branding */}
        <div className="w-full md:w-2/5 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 flex flex-col justify-between text-white">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Book className="h-8 w-8" />
              <h1 className="text-2xl font-bold">Sagefy</h1>
            </div>
            <p className="text-blue-100">Aprendizagem adaptativa para todos</p>
          </div>

          <div className="hidden md:block space-y-6 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm p-4 rounded-lg"
            >
              <h3 className="font-medium mb-2">Aprendizado Personalizado</h3>
              <p className="text-sm text-blue-100">
                Conteúdo adaptado ao seu ritmo e estilo de aprendizagem.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm p-4 rounded-lg"
            >
              <h3 className="font-medium mb-2">Assistente Inteligente</h3>
              <p className="text-sm text-blue-100">
                Tire dúvidas e receba orientações em tempo real.
              </p>
            </motion.div>
          </div>

          <div className="hidden md:block text-sm text-blue-100">
            © {new Date().getFullYear()} Sagefy. Todos os direitos reservados.
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full md:w-3/5 p-4 md:p-8">
          <div className="max-w-md mx-auto space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">
                Bem-vindo de volta!
              </h2>
              <p className="text-gray-500">
                Acesse sua conta para continuar aprendendo
              </p>
            </div>

            <Card className="border-0 shadow-none">
              <CardContent className="p-0">
                <Tabs
                  value={activeTab}
                  onValueChange={(value) =>
                    setActiveTab(value as "student" | "staff")
                  }
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 mb-6 rounded-full p-1 bg-gray-100">
                    <TabsTrigger
                      value="student"
                      className={cn(
                        "flex items-center gap-2 rounded-full transition-all",
                        activeTab === "student"
                          ? "bg-white shadow-sm"
                          : "hover:bg-gray-200/50"
                      )}
                    >
                      <GraduationCap className="h-4 w-4" />
                      <span>Aluno</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="staff"
                      className={cn(
                        "flex items-center gap-2 rounded-full transition-all",
                        activeTab === "staff"
                          ? "bg-white shadow-sm"
                          : "hover:bg-gray-200/50"
                      )}
                    >
                      <UserCog className="h-4 w-4" />
                      <span>Professor/Admin</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="student" className="mt-0">
                    <Suspense>
                      <StudentLoginForm />
                    </Suspense>
                  </TabsContent>
                  <TabsContent value="staff" className="mt-0">
                    <StaffLoginForm />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile footer */}
      <div className="md:hidden text-center text-xs text-gray-500 mt-6">
        © {new Date().getFullYear()} Sagefy. Todos os direitos reservados.
      </div>
    </div>
  );
}
