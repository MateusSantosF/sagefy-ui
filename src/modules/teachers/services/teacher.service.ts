import { axiosWithInterceptor } from "@/configs/axios-with-interceptor";

export interface ICreateTeacherRequest {
  email: string;
  password: string;
  name?: string;
}
export interface IDeactivateTeacherRequest {
  email: string;
}

class TeacherService {
  async getAllTeachers() {
    const response = await axiosWithInterceptor.get("/teachers");
    return response.data;
  }

  async createTeacher(data: ICreateTeacherRequest) {
    const response = await axiosWithInterceptor.post("/teachers", data);
    return response.data;
  }

  async deactivateTeacher(data: IDeactivateTeacherRequest) {
    const response = await axiosWithInterceptor.delete("/teachers", {
      params: data,
    });
    return response.data;
  }

  async changeTeacherPassword(data: {
    teacherId: string;
    newPassword: string;
  }) {
    const response = await axiosWithInterceptor.put(`/teachers/password`, data);
    return response.data;
  }
}

export const teacherService = new TeacherService();
