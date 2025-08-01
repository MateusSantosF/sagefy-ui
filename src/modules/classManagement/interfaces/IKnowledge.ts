export interface IResource {
  id: string; // por exemplo, o nome do blob
  name: string;
  size: number;
  uploadedAt: string;
  url: string;
  metadata: {
    uploaded_by: string;
    class_code: string;
    file_id: string;
    original_name: string;
  };
}

export interface IGetResourcesResponse {
  files: IResource[];
}

export interface IUploadResourceRequest {
  fileName: string;
  fileContent: string; 
  class_code?: string;
}

export interface IUploadResourceResponse {
  message: string;
  data: IResource;
}
