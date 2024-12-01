export type IMessage = {
  id: string;
  content: string;
  sender: ESenderType,
  summarized?: boolean;
  liked?: boolean;
};

export enum ESenderType{
  ASSISTANT = "assistant",
  USER = "user",
  SYSTEM = "system"
} 
