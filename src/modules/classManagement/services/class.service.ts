import { axiosWithInterceptor } from "@/configs/axios-with-interceptor";
import {
  IAddStudentsRequest,
  ICreateClassRequest,
  IRemoveStudentRequest,
} from "../interfaces/IClass";

export class ClassService {
  async getAllClasses() {
    const response = await axiosWithInterceptor.get(`/classes`);
    return response.data;
  }

  async getClassDetails(classCode: string) {
    const response = await axiosWithInterceptor.get(`/classes/read`, {
      params: { classCode },
    });
    return response.data;
  }

  async createClass(data: ICreateClassRequest) {
    const response = await axiosWithInterceptor.post(`/classes`, data);
    return response.data;
  }

  async updateClass(data: { classCode: string; accessCode: string, className: string }) {
    const response = await axiosWithInterceptor.put(`/classes`, data);
    return response.data;
  }

  async deleteClass(classCode: string) {
    const response = await axiosWithInterceptor.delete(`/classes`, {
      params: { classCode },
    });
    return response.data;
  }

  async addStudents(data: IAddStudentsRequest) {
    const response = await axiosWithInterceptor.post(`/classes/students`, data);
    return response.data;
  }

  async removeStudent(data: IRemoveStudentRequest) {
    const response = await axiosWithInterceptor.post(
      `/classes/students/remove`,
      data
    );
    return response.data;
  }
}

export const classService = new ClassService();
