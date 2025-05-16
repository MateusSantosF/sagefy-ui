import { useToast } from "@/hooks/use-toast";
import { staftAuth } from "@modules/auth/actions/StaffAuth";
import { Button } from "@shared/components//ui/button";
import { Input } from "@shared/components//ui/input";
import { Label } from "@shared/components//ui/label";
import { useAuth } from "@shared/contexts/auth.context";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function StaffLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserByCookies } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      await staftAuth({
        email: email,
        password: password,
      });
      setUserByCookies();
      router.push("/dashboard");
    } catch (err) {
      toast({
        title: "Ops...",
        description: "Verifique seu email e senha",
      });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="staff-email">Email</Label>
        <Input
          id="staff-email"
          type="email"
          placeholder="seu.email@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        {isLoading ? <LoaderCircle /> : null}
        {isLoading ? "Entrando..." : "Entrar como Professor/Admin"}
      </Button>
    </form>
  );
}
