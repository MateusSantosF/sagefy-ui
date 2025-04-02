import { axiosWithInterceptor } from "@/configs/axios-with-interceptor";
import { IDashboardMetric } from "../interfaces/IDashboard";

export class DashboardService {
  async getMetrics(): Promise<IDashboardMetric> {
    const response = await axiosWithInterceptor.get(`/dashboard`);
    return response.data;
  }
}

export const dashboardService = new DashboardService();
