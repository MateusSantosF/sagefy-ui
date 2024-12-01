"use server";

import { api } from "@/configs/axios";
import {
  ISentFeedbackRequest,
  ISentFeedbackResponse,
  ISentMessageRequest,
  ISentMessageResponse,
} from "@/shared/interfaces/Requests";

export async function sentMessage(dto: ISentMessageRequest) {
  try {
    const response = await api.post<ISentMessageResponse>("/chat", dto);
    return response.data;
  } catch (err: unknown) {
    console.error(err);
  }
}

export async function sentFeedback(dto: ISentFeedbackRequest) {
  try {
    const response = await api.post<ISentFeedbackResponse>("/feedback", dto);
    return response.data;
  } catch (err: unknown) {
    console.error(err);
  }
}
