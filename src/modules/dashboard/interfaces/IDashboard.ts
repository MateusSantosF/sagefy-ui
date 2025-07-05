export interface IDashboardMetric {
  metrics: Record<string, IClassMetric[]>;
}

export interface IClassMetric {
  year?: number;
  month?: number;
  total_conversations: number;
  total_prompt_tokens: number;
  total_completion_tokens: number;
  class_code: string;
  total_tokens: number;
  top_categories: string[];
  top_subcategories: string[];
  top_studendaily_summaryts: IStudentMetric[];
  daily_summary: string;
  timestamp: string;
}

export interface IStudentMetric {
  email:string;
  count:number;
}