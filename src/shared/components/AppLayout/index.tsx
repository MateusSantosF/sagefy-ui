"use client";

import { type ReactNode, useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  LogOut,
  Plus,
  Menu,
  BotIcon,
} from "lucide-react";
import { useAuth } from "@shared/contexts/auth.context";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { CreateClassModal } from "@modules/classManagement/components/CreateClassModal";
import Link from "next/link";
import { getInitials } from "@shared/utils/get-initials";

interface LayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: LayoutProps) {
  const { user, signout } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Avoid hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || user?.roles == "STUDENT" || !user) {
    return children;
  }

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex flex-col   ">
      <div className="flex-1  flex flex-col items-start gap-4 mt-8">
        <Link href={`/dashboard`} onClick={handleLinkClick}>
          <Button variant="ghost" size="default" className="rounded-full">
            <LayoutDashboard className="h-5 w-5" />
            <span className="ml-2 md:hidden">Dashboard</span>
          </Button>
        </Link>
        <Link href={`/classes`} onClick={handleLinkClick}>
          <Button variant="ghost" size="default" className="rounded-full">
            <Users className="h-5 w-5" />
            <span className="ml-2 md:hidden">Minhas turmas</span>
          </Button>
        </Link>
        <Link href={`/chat`} onClick={handleLinkClick}>
          <Button variant="ghost" size="default" className="rounded-full">
            <BotIcon className="h-5 w-5" />
            <span className="ml-2 md:hidden">Chatbot</span>
          </Button>
        </Link>
      </div>

      <div className="flex items-center p-6">
        <Button
          variant="outline"
          size="default"
          className=" bg-primary text-white hover:bg-primary/90 hover:text-white"
          onClick={() => {
            setIsCreateModalOpen(true);
            setIsMobileMenuOpen(false);
          }}
        >
          <Plus className="h-5 w-5" />
          Criar nova turma
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <div className="hidden md:w-16 md:bg-white md:dark:bg-gray-800 md:flex md:flex-col md:items-center md:py-4 md:border-r md:border-gray-200 md:dark:border-gray-700">
        <TooltipProvider>
          <div className="flex-1 flex flex-col items-center gap-4 mt-8">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={`/dashboard`}>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <LayoutDashboard className="h-5 w-5" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Dashboard</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={`/classes`}>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Users className="h-5 w-5" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Minhas turmas</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={`/chat`}>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <BotIcon className="h-5 w-5" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Conversar com o chatbot</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="mt-auto mb-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-primary text-white hover:bg-primary/90 hover:text-white"
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Create Class</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="h-16 border-b border-gray-200 dark:border-gray-700 flex items-center px-4">
                  <h2 className="text-lg font-semibold">Menu</h2>
                </div>
                <div className="p-4">
                  <SidebarContent />
                </div>
              </SheetContent>
            </Sheet>

            <Avatar>
              <AvatarFallback>
                {user?.name ? getInitials(user.name) : "U"}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium truncate max-w-[120px] sm:max-w-none">
              {user?.name || "Teacher"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => signout()}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>

      <CreateClassModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onClassCreated={() => {
          setIsCreateModalOpen(false);
          window.location.reload();
        }}
      />
    </div>
  );
}
