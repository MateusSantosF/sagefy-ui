import { useState } from "react";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { studentAuth } from "@modules/auth/actions/StudentAuth";
import { useAuth } from "@shared/contexts/auth.context";
import { useToast } from "@/hooks/use-toast";

export default function StudentLoginForm() {
  const [email, setEmail] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const { setUserByCookies } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await studentAuth({
        email,
        accessCode: accessCode,
      });
      setUserByCookies();
      window.location.assign(new URL("/chat", window.location.href));
    } catch (err) {
      toast({
        title: "Erro",
        description: "Erro ao fazer login",
      });
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="student-email">Email</Label>
        <Input
          id="student-email"
          type="email"
          placeholder="seu.email@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="access-code">Código de Acesso</Label>
        <Input
          id="access-code"
          type="text"
          placeholder="Digite seu código de acesso"
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Entrar como Aluno
      </Button>
    </form>
  );
}
