"use server";

import { axiosWithInterceptor } from "@/configs/axios-with-interceptor";
import {
  ISentFeedbackRequest,
  ISentFeedbackResponse,
} from "@/shared/interfaces/Requests";

export async function sentFeedback(dto: ISentFeedbackRequest) {
  try {
    const response = await axiosWithInterceptor.post<ISentFeedbackResponse>(
      "/feedback",
      dto
    );
    return response.data;
  } catch (err: unknown) {
    console.error(err);
  }
}
