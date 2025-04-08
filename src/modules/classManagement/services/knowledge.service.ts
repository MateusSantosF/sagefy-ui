import { axiosWithInterceptor } from "@/configs/axios-with-interceptor";
import {
  IGetResourcesResponse,
  IUploadResourceRequest,
  IUploadResourceResponse,
} from "../interfaces/IKnowledge";

export class KnowledgeService {
  async getResources(classCode: string): Promise<IGetResourcesResponse> {
    const response = await axiosWithInterceptor.get(`/files`, {
      params: { class_code: classCode },
    });
    return response.data;
  }

  async uploadResource(
    data: IUploadResourceRequest
  ): Promise<IUploadResourceResponse> {
    const response = await axiosWithInterceptor.post(`/files`, data);
    return response.data;
  }

  async deleteResource(data: {
    fileName: string;
    classCode: string;
    fileId: string;
  }): Promise<{ success: boolean }> {
    const response = await axiosWithInterceptor.delete(`/files`, {
      params: {
        file_name: data.fileName,
        class_code: data.classCode,
        file_id: data.fileId,
      },
    });
    return response.data;
  }
}

export const knowledgeService = new KnowledgeService();
