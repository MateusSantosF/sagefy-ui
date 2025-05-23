"use client";

import ChatInput from "@/shared/components/ChatInput/Index";
import ChatLayout from "@/shared/components/ChatLayout";
import { Header } from "@/shared/components/Header";
import MessageBubble from "@/shared/components/MessageBubble";
import { MessageBubbleSkeleton } from "@/shared/components/MessageBubbleSkeleton";
import ScrollToBottomButton from "@/shared/components/ScrollToBottomButton";
import { useChatMessages } from "@/shared/hooks/useChatMessages";
import { ESenderType } from "@/shared/interfaces/Message";
import { sentMessage } from "@modules/auth/actions/SentMessage";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const DEFAULT_ERROR_MESSAGE =
  "Desculpe, tivemos um imprevisto ao processar sua mensagem. Tente novamente mais tarde.";

export default function ChatPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { messages, history, addMessage, addHistory } = useChatMessages();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleSend = async (message: string) => {
    setIsLoading(true);
    addMessage({ content: message, sender: ESenderType.USER, id: uuidv4() });

    try {
      const response = await sentMessage({
        prompt: message,
        origin: "chat",
        history: history,
      });
      if (!response) {
        addMessage({
          id: uuidv4(),
          content: DEFAULT_ERROR_MESSAGE,
          sender: ESenderType.ASSISTANT,
          type: "error",
        });
        return;
      }
      addHistory(response.history);
      addMessage({
        id: response.id,
        content: response.response,
        sender: ESenderType.ASSISTANT,
      });
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <ChatLayout>
      <Header />
      <div
        ref={scrollContainerRef}
        className="flex-1 flex w-full gap-6 flex-col items-center overflow-y-auto px-4"
      >
        <div className="container max-w-6xl h-screen">
          {messages.map((msg, index) => (
            <MessageBubble key={index} message={msg} />
          ))}
          {isLoading && <MessageBubbleSkeleton />}
        </div>
      </div>
      <ChatInput loading={isLoading} onSend={handleSend} />
      <ScrollToBottomButton scrollContainerRef={scrollContainerRef} />
    </ChatLayout>
  );
};


