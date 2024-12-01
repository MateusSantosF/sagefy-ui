import { IMessage } from "./Message";

export interface ISentMessageRequest {
  user_id?: string;
  prompt: string;
  origin: string;
  user_roles?: string;
  notice_name?: string;
  notice_number?: string;
  history?: IMessage[];
}

export interface ISentMessageResponse {
    id: string;
    response: string;
    history: IMessage[];
}

export interface ISentFeedbackRequest {
    id: string;
    liked: boolean;
    dislikeReason?: string;
}

export interface ISentFeedbackResponse {
    message: string;
}