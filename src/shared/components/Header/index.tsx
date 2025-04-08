"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@shared/contexts/auth.context";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getInitials } from "@shared/utils/get-initials";
import { LogOut, Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { motion } from "framer-motion";

export const Header = () => {
  const { signout, user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (user?.roles == "ADMIN" || user?.roles == "TEACHER") {
    return null;
  }

  return (
    <header
      className={`sticky top-0 z-50 h-20 w-full flex items-center justify-between px-4 md:px-6 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md"
          : "bg-primary"
      }`}
    >
      <div className="flex items-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`font-bold text-2xl ${
            scrolled ? "text-primary dark:text-white" : "text-white"
          }`}
        >
          Sagefy
        </motion.h1>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden text-white p-2"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Desktop menu */}
      <div className="hidden md:flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10 border-2 border-white hover:border-secondary transition-all">
                <AvatarFallback className="bg-secondary text-primary font-medium">
                  {user?.email ? getInitials(user.email) : "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-500 focus:text-red-500 cursor-pointer"
              onClick={() => signout()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-20 left-0 right-0 bg-white dark:bg-gray-900 shadow-md p-4 flex flex-col items-center gap-4 md:hidden"
        >
          <div className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-secondary text-primary font-medium">
                {user?.name ? getInitials(user.name) : "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{user?.name}</span>
              <span className="text-sm text-gray-500">{user?.email}</span>
            </div>
          </div>
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => signout()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </motion.div>
      )}
    </header>
  );
};
