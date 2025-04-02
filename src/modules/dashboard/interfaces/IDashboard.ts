export interface IDashboardMetric {
  metrics: Record<string, IClassMetric[]>;
}

export interface IClassMetric {
  RowKey?: string;
  PartitionKey?: string;
  total_conversations: number;
  total_prompt_tokens: number;
  total_completion_tokens: number;
  class_code: string;
  total_tokens: number;
  top_categories: string;
  top_subcategories: string;
  timestamp: string;
}
