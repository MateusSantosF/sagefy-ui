"use server";

import { axiosWithInterceptor } from "@/configs/axios-with-interceptor";
import {
  ISentFeedbackRequest,
  ISentFeedbackResponse,
  ISentMessageRequest,
  ISentMessageResponse,
} from "@/shared/interfaces/Requests";

export async function sentMessage(dto: ISentMessageRequest) {
  try {
    const response = await axiosWithInterceptor.post<ISentMessageResponse>("/chat", dto);
    console.log(response.data);
    return response.data;
  } catch (err: unknown) {
    console.error(err);
  }
}

export async function sentFeedback(dto: ISentFeedbackRequest) {
  try {
    const response = await axiosWithInterceptor.post<ISentFeedbackResponse>("/feedback", dto);
    return response.data;
  } catch (err: unknown) {
    console.error(err);
  }
}
