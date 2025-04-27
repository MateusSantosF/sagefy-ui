export type IMessage = {
  id: string;
  content: string;
  sender: ESenderType;
  liked?: boolean;
  type?: MessageType;
};

export type MessageType = "text" | "options" | "error";


export enum ESenderType{
  ASSISTANT = "assistant",
  USER = "user",
  SYSTEM = "system"
} 
