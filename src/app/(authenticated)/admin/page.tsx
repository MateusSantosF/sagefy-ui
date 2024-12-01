"use client";

import React from "react";
import { Layout, Card, Statistic, Tooltip, DatePicker } from "antd";
import {
  FileOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  QuestionCircleOutlined,
  AimOutlined,
  StarOutlined,
  TeamOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import BarChart from "@/shared/components/BarChart";
import LineChart from "@/shared/components/LineChart";
import PieChart from "@/shared/components/PieChart/PieChart";
import TrainingCard from "@/shared/components/TrainingCard";

const { Header, Content } = Layout;
const { RangePicker } = DatePicker;

// Componente Header
const HeaderComponent = () => (
  <Header className="bg-white shadow-md">
    <h1 className="text-2xl font-bold text-gray-800">
      Tela de Treinamento do Chatbot
    </h1>
  </Header>
);

// Componente para as Estatísticas Individuais
const StatisticsGrid = () => {
  const stats = [
    {
      title: "Arquivos Processados",
      value: 1234,
      icon: <FileOutlined />,
    },
    {
      title: "Tempo de Processamento",
      value: "2h 15min",
      icon: <ClockCircleOutlined />,
    },
    {
      title: "Taxa de Sucesso",
      value: 95,
      suffix: "%",
      icon: <CheckCircleOutlined />,
    },
    {
      title: "Q&As Geradas",
      value: 5678,
      icon: <QuestionCircleOutlined />,
    },
    {
      title: "Precisão do Chatbot",
      value: 89,
      suffix: "%",
      icon: <AimOutlined />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <Statistic
            title={stat.title}
            value={stat.value}
            suffix={stat.suffix}
            prefix={stat.icon}
          />
        </Card>
      ))}
    </div>
  );
};

// Componente para os Gráficos
const ChartsGrid = () => {
  const barData = [
    { name: "PDF", value: 65 },
    { name: "DOCX", value: 25 },
    { name: "PPTX", value: 10 },
  ];

  const lineData = [
    { name: "Treinamento 1", precisao: 75 },
    { name: "Treinamento 2", precisao: 82 },
    { name: "Treinamento 3", precisao: 89 },
  ];

  const pieData = [
    { name: "Disciplinas", value: 40 },
    { name: "Notas", value: 30 },
    { name: "Datas", value: 30 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      <Card
        title="Distribuição de Arquivos"
        extra={
          <Tooltip title="Tipos de arquivos processados">
            <InfoCircleOutlined />
          </Tooltip>
        }
      >
        <BarChart data={barData} />
      </Card>
      <Card
        title="Evolução da Precisão"
        extra={
          <Tooltip title="Precisão ao longo dos treinamentos">
            <InfoCircleOutlined />
          </Tooltip>
        }
      >
        <LineChart data={lineData} />
      </Card>
      <Card
        title="Q&As por Categoria"
        extra={
          <Tooltip title="Distribuição de Q&As por tipo de conteúdo">
            <InfoCircleOutlined />
          </Tooltip>
        }
      >
        <PieChart data={pieData} colors={COLORS} />
      </Card>
    </div>
  );
};

// Componente para Estatísticas Adicionais
const AdditionalStatistics = () => {
  const stats = [
    {
      title: "Média de Avaliações",
      value: 4.5,
      suffix: "/ 5",
      icon: <StarOutlined />,
    },
    {
      title: "Número de Interações",
      value: 9876,
      icon: <TeamOutlined />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <Statistic
            title={stat.title}
            value={stat.value}
            suffix={stat.suffix}
            prefix={stat.icon}
          />
        </Card>
      ))}
    </div>
  );
};

// Componente Principal
export default function Component() {
  return (
    <Layout className="min-h-screen bg-gray-100">
      <HeaderComponent />
      <Content className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card
            title="Métricas do Último Treinamento"
            extra={<RangePicker />}
            className="col-span-1 lg:col-span-2"
          >
            <p className="text-gray-600 mb-4">
              Último treinamento em 25/04/2024 às 14:30
            </p>
            <StatisticsGrid />
            <ChartsGrid />
            <AdditionalStatistics />
          </Card>
          <TrainingCard />
        </div>
      </Content>
    </Layout>
  );
}
