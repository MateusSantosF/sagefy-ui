"use client";

import { useState } from "react";

import StudentLoginForm from "@/modules/auth/components/StudentLoginForm";
import SagefyLogo from "@shared/components/SagefyLogo";
import StaffLoginForm from "@/modules/auth/components/StaffLoginForm";
import { Card, CardContent } from "@shared/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@shared/components/ui/tabs";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"student" | "staff">("student");

  return (
    <div className="h-screen flex flex-col items-center bg-primary justify-center">
      <SagefyLogo />

      <div className="w-full flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <Tabs
              value={activeTab}
              onValueChange={(value) =>
                setActiveTab(value as "student" | "staff")
              }
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student">Aluno</TabsTrigger>
                <TabsTrigger value="staff">Professor/Admin</TabsTrigger>
              </TabsList>
              <TabsContent value="student">
                <StudentLoginForm />
              </TabsContent>
              <TabsContent value="staff">
                <StaffLoginForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
