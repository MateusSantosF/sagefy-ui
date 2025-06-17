import { axiosWithInterceptor } from "@/configs/axios-with-interceptor";
import { IDashboardMetric } from "../interfaces/IDashboard";

export const dashboardMetrics: IDashboardMetric = {
  metrics: {
    "turma-matematica-avancada": [
      {
        timestamp: "2025-06-10",
        class_code: "turma-matematica-avancada",
        total_conversations: 3,
        total_prompt_tokens: 7845,
        total_completion_tokens: 645,
        total_tokens: 8490,
        top_categories: ["Matemática", "Raciocínio Lógico"],
        top_subcategories: ["Álgebra Linear", "Probabilidade"],
        top_students: [
          { email: "carlos.oliveira@student.com", count: 2 },
          { email: "mariana.santos@student.com", count: 1 },
        ],
        
      },
      {
        timestamp: "2025-06-11",
        class_code: "turma-matematica-avancada",
        total_conversations: 4,
        total_prompt_tokens: 9850,
        total_completion_tokens: 790,
        total_tokens: 10640,
        top_categories: ["Matemática", "Geometria"],
        top_subcategories: ["Geometria Analítica", "Trigonometria"],
        top_students: [
          { email: "ana.paula@student.com", count: 2 },
          { email: "bruno.moura@student.com", count: 2 },
        ],
        
      },
      {
        timestamp: "2025-06-12",
        class_code: "turma-matematica-avancada",
        total_conversations: 2,
        total_prompt_tokens: 5230,
        total_completion_tokens: 420,
        total_tokens: 5650,
        top_categories: ["Matemática"],
        top_subcategories: ["Cálculo Diferencial", "Trigonometria"],
        top_students: [
          { email: "carlos.oliveira@student.com", count: 1 },
          { email: "mariana.santos@student.com", count: 1 },
        ],
        
      },
      {
        timestamp: "2025-06-13",
        class_code: "turma-matematica-avancada",
        total_conversations: 5,
        total_prompt_tokens: 11200,
        total_completion_tokens: 980,
        total_tokens: 12180,
        top_categories: ["Matemática", "Estatística"],
        top_subcategories: ["Inferência Estatística", "Distribuições"],
        top_students: [
          { email: "ana.paula@student.com", count: 3 },
          { email: "carlos.oliveira@student.com", count: 2 },
        ],
        
      },
      {
        timestamp: "2025-06-14",
        class_code: "turma-matematica-avancada",
        total_conversations: 3,
        total_prompt_tokens: 6340,
        total_completion_tokens: 550,
        total_tokens: 6890,
        top_categories: ["Matemática", "Raciocínio Lógico"],
        top_subcategories: ["Lógica de Predicados", "Combinações"],
        top_students: [
          { email: "bruno.moura@student.com", count: 1 },
          { email: "mariana.santos@student.com", count: 2 },
        ],
        
      },
      {
        timestamp: "2025-06-15",
        class_code: "turma-matematica-avancada",
        total_conversations: 4,
        total_prompt_tokens: 9200,
        total_completion_tokens: 800,
        total_tokens: 10000,
        top_categories: ["Matemática", "Cálculo"],
        top_subcategories: ["Integrais", "Derivadas"],
        top_students: [
          { email: "ana.paula@student.com", count: 2 },
          { email: "bruno.moura@student.com", count: 2 },
        ],
        
      },
      {
        timestamp: "2025-06-16",
        class_code: "turma-matematica-avancada",
        total_conversations: 1,
        total_prompt_tokens: 3120,
        total_completion_tokens: 260,
        total_tokens: 3380,
        top_categories: ["Matemática"],
        top_subcategories: ["Teoria dos Números"],
        top_students: [{ email: "mariana.santos@student.com", count: 1 }],
        
      },
    ],

    "turma-historia-brasil": [
      {
        timestamp: "2025-06-10",
        class_code: "turma-historia-brasil",
        total_conversations: 2,
        total_prompt_tokens: 6450,
        total_completion_tokens: 540,
        total_tokens: 6990,
        top_categories: ["História", "Ciências Sociais"],
        top_subcategories: ["Era Colonial", "Movimentos Sociais"],
        top_students: [{ email: "joao.cruz@student.com", count: 2 }],
        
      },
      {
        timestamp: "2025-06-11",
        class_code: "turma-historia-brasil",
        total_conversations: 3,
        total_prompt_tokens: 8120,
        total_completion_tokens: 720,
        total_tokens: 8840,
        top_categories: ["História"],
        top_subcategories: ["Independência", "Primeira República"],
        top_students: [{ email: "larissa.lima@student.com", count: 3 }],
        
      },
      {
        timestamp: "2025-06-12",
        class_code: "turma-historia-brasil",
        total_conversations: 2,
        total_prompt_tokens: 5320,
        total_completion_tokens: 430,
        total_tokens: 5750,
        top_categories: ["História", "Documentação"],
        top_subcategories: ["Ditadura Militar", "Arquivos Históricos"],
        top_students: [{ email: "pedro.alves@student.com", count: 2 }],
        
      },
      {
        timestamp: "2025-06-13",
        class_code: "turma-historia-brasil",
        total_conversations: 4,
        total_prompt_tokens: 11900,
        total_completion_tokens: 950,
        total_tokens: 12850,
        top_categories: ["História", "Ciências Sociais"],
        top_subcategories: [
          "Revolução Industrial no Brasil",
          "Movimentos Sindicais",
        ],
        top_students: [
          { email: "joao.cruz@student.com", count: 3 },
          { email: "larissa.lima@student.com", count: 1 },
        ],
        
      },
      {
        timestamp: "2025-06-14",
        class_code: "turma-historia-brasil",
        total_conversations: 1,
        total_prompt_tokens: 2980,
        total_completion_tokens: 300,
        total_tokens: 3280,
        top_categories: ["História"],
        top_subcategories: ["Era Vargas"],
        top_students: [{ email: "pedro.alves@student.com", count: 1 }],
        
      },
      {
        timestamp: "2025-06-15",
        class_code: "turma-historia-brasil",
        total_conversations: 3,
        total_prompt_tokens: 7650,
        total_completion_tokens: 630,
        total_tokens: 8280,
        top_categories: ["História", "Documentação"],
        top_subcategories: ["Cronologia Histórica", "Documentos Oficiais"],
        top_students: [
          { email: "larissa.lima@student.com", count: 2 },
          { email: "joao.cruz@student.com", count: 1 },
        ],
        
      },
      {
        timestamp: "2025-06-16",
        class_code: "turma-historia-brasil",
        total_conversations: 2,
        total_prompt_tokens: 5420,
        total_completion_tokens: 480,
        total_tokens: 5900,
        top_categories: ["História"],
        top_subcategories: ["Movimentos Feministas"],
        top_students: [{ email: "pedro.alves@student.com", count: 2 }],
        
      },
    ],

    "turma-fisica-experimental": [
      {
        timestamp: "2025-06-10",
        class_code: "turma-fisica-experimental",
        total_conversations: 2,
        total_prompt_tokens: 6500,
        total_completion_tokens: 610,
        total_tokens: 7110,
        top_categories: ["Física", "Ciência"],
        top_subcategories: ["Mecânica", "Estática"],
        top_students: [{ email: "mariana.rodrigues@student.com", count: 2 }],
        
      },
      {
        timestamp: "2025-06-11",
        class_code: "turma-fisica-experimental",
        total_conversations: 3,
        total_prompt_tokens: 9120,
        total_completion_tokens: 820,
        total_tokens: 9940,
        top_categories: ["Física"],
        top_subcategories: ["Termodinâmica", "Ondulatória"],
        top_students: [
          { email: "pedro.silva@student.com", count: 2 },
          { email: "lucas.teixeira@student.com", count: 1 },
        ],
        
      },
      {
        timestamp: "2025-06-12",
        class_code: "turma-fisica-experimental",
        total_conversations: 1,
        total_prompt_tokens: 3240,
        total_completion_tokens: 300,
        total_tokens: 3540,
        top_categories: ["Física", "Óptica"],
        top_subcategories: ["Óptica Geométrica"],
        top_students: [{ email: "mariana.rodrigues@student.com", count: 1 }],
        
      },
      {
        timestamp: "2025-06-13",
        class_code: "turma-fisica-experimental",
        total_conversations: 4,
        total_prompt_tokens: 10800,
        total_completion_tokens: 950,
        total_tokens: 11750,
        top_categories: ["Física", "Ciência"],
        top_subcategories: ["Eletricidade", "Eletromagnetismo"],
        top_students: [
          { email: "pedro.silva@student.com", count: 3 },
          { email: "lucas.teixeira@student.com", count: 1 },
        ],
        
      },
      {
        timestamp: "2025-06-14",
        class_code: "turma-fisica-experimental",
        total_conversations: 2,
        total_prompt_tokens: 5800,
        total_completion_tokens: 540,
        total_tokens: 6340,
        top_categories: ["Física"],
        top_subcategories: ["Termodinâmica"],
        top_students: [{ email: "lucas.teixeira@student.com", count: 2 }],
        
      },
      {
        timestamp: "2025-06-15",
        class_code: "turma-fisica-experimental",
        total_conversations: 3,
        total_prompt_tokens: 8300,
        total_completion_tokens: 700,
        total_tokens: 9000,
        top_categories: ["Física", "Mecânica"],
        top_subcategories: ["Dinâmica", "Forças"],
        top_students: [
          { email: "mariana.rodrigues@student.com", count: 1 },
          { email: "pedro.silva@student.com", count: 2 },
        ],
        
      },
      {
        timestamp: "2025-06-16",
        class_code: "turma-fisica-experimental",
        total_conversations: 1,
        total_prompt_tokens: 2900,
        total_completion_tokens: 260,
        total_tokens: 3160,
        top_categories: ["Física"],
        top_subcategories: ["Óptica Física"],
        top_students: [{ email: "lucas.teixeira@student.com", count: 1 }],
        
      },
    ],
  },
};

export class DashboardService {
  async getMetrics(): Promise<IDashboardMetric> {
    const response = await axiosWithInterceptor.get(`/dashboard`);
    return response.data;
  }
}

export const dashboardService = new DashboardService();
