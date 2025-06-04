import { useState } from "react";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { studentAuth } from "@modules/auth/actions/StudentAuth";
import { useAuth } from "@shared/contexts/auth.context";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function StudentLoginForm() {
  const searchParams = useSearchParams();
  const defaultClassCode = searchParams.get("classCode") || "";
  const defaultAcessCode = searchParams.get("accessCode") || "";

  const [email, setEmail] = useState("");
  const [accessCode, setAccessCode] = useState(defaultAcessCode);
  const [classCode, setClassCode] = useState(defaultClassCode);
  const { setUserByCookies } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await studentAuth({
        email,
        accessCode: accessCode?.trim(),
        classCode: classCode?.trim(),
      });
      setUserByCookies();
      router.push("/chat");
    } catch (err) {
        toast({
        title: "Ops...",
        description: "Verifique se o e-mail, código de acesso e código da turma estão corretos.",
      });
      console.error(err);
    } finally {
      setIsLoading(false);
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
        <Label htmlFor="access-code">Código da turma</Label>
        <Input
          id="class-code"
          type="text"
          placeholder="Digite o código da turma"	
          value={classCode}
          onChange={(e) => setClassCode(e.target.value)}
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
        {isLoading ? <LoaderCircle /> : null}
        {isLoading ? "Entrando..." : "Entrar como Aluno"}
      </Button>
    </form>
  );
}
