import { axiosWithInterceptor } from "@/configs/axios-with-interceptor";
import {
  ISentMessageRequest,
  ISentMessageResponse,
} from "@/shared/interfaces/Requests";

export async function sentMessage(dto: ISentMessageRequest) {
  try {
    const response = await axiosWithInterceptor.post<ISentMessageResponse>("/chat", dto);
    return response.data;
  } catch (err: unknown) {
    console.error(err);
  }
}
