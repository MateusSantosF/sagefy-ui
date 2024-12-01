"use client"

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { IMessage } from "../interfaces/Message";

const MAX_MESSAGES = 180;
const MIN_MESSAGES = 20;
const LOCAL_STORAGE_KEY = "chatMessages";

interface ChatMessagesContextType {
  messages: IMessage[];
  history: IMessage[];
  addMessage: (newMessage: IMessage) => void;
  addHistory: (newMessage: IMessage[]) => void;
  clearMessages: () => void;
  addFeedback: (messageId: string, liked: boolean) => void;
}

const ChatMessagesContext = createContext<ChatMessagesContextType | undefined>(
  undefined
);

export const ChatMessagesProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [history, setHistory] = useState<IMessage[]>([]);

  useEffect(() => {
    const savedMessages = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedMessages) {
      const parsedMessages: IMessage[] = JSON.parse(savedMessages);
      setMessages(parsedMessages);
      setHistory(parsedMessages.slice(-MIN_MESSAGES));
    }
  }, []);

  useEffect(() => {
    if (messages.length > MAX_MESSAGES) {
      const trimmedMessages = messages.slice(-MAX_MESSAGES);
      setMessages(trimmedMessages);
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  const addMessage = (newMessage: IMessage) => {
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, newMessage];

      if (updatedMessages.length > MAX_MESSAGES) {
        return updatedMessages.slice(-MAX_MESSAGES);
      }

      return updatedMessages;
    });
  };

  const addHistory = (newMessage: IMessage[]) => {
    setHistory(newMessage);
  };

  const addFeedback = (messageId: string, liked: boolean) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === messageId ? { ...message, liked } : message
      )
    );
  };

  const clearMessages = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setMessages([]);
  };

  return (
    <ChatMessagesContext.Provider
      value={{ messages,history, addMessage, addHistory, clearMessages, addFeedback }}
    >
      {children}
    </ChatMessagesContext.Provider>
  );
};

export const useChatMessages = (): ChatMessagesContextType => {
  const context = useContext(ChatMessagesContext);
  if (!context) {
    throw new Error(
      "useChatMessages must be used within a ChatMessagesProvider"
    );
  }
  return context;
};
