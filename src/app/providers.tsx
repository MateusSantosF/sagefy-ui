import { ChatMessagesProvider } from "@/shared/hooks/useChatMessages";
import { Toaster } from "@shared/components/ui/toaster";
import { AuthProvider } from "@shared/contexts//auth.context";


export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <AuthProvider>
      <ChatMessagesProvider>{children}</ChatMessagesProvider>
      <Toaster />
    </AuthProvider>
  );
}
