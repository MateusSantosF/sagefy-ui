"use client";

import ChatInput from "@/shared/components/ChatInput/Index";
import ChatLayout from "@/shared/components/ChatLayout";
import { Header } from "@/shared/components/Header";
import MessageBubble from "@/shared/components/MessageBubble";
import { MessageBubbleSkeleton } from "@/shared/components/MessageBubbleSkeleton";
import ScrollToBottomButton from "@/shared/components/ScrollToBottomButton";
import { useUserMetadata } from "@/shared/contexts/UserMetadataContext";
import { useChatMessages } from "@/shared/hooks/useChatMessages";
import { ESenderType } from "@/shared/interfaces/Message";
import { ISentMessageRequest } from "@/shared/interfaces/Requests";
import { parseToInterface } from "@/shared/utils/parse-to-interface";
import { useEffect, useRef, useState } from "react";
import { sentMessage } from "../actions";
import { v4 as uuidv4 } from "uuid";

const ChatPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { messages, history, addMessage, addHistory } = useChatMessages();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { metadata } = useUserMetadata();

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

    const parsedMetadata = parseToInterface<ISentMessageRequest>(metadata, {});

    try {
      parsedMetadata.prompt = message;
      parsedMetadata.origin = origin || "NOT_DEFINIED";
      parsedMetadata.history = history;
      const response = await sentMessage(parsedMetadata);
      if (!response) {
        return;
      }
      addHistory(response.history);
      addMessage({
        id: response.id,
        content: response.response,
        sender: ESenderType.ASSISTANT,
      });
    } catch (error) {
      console.error(error);
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
        <div className="container max-w-6xl">
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

export default ChatPage;
