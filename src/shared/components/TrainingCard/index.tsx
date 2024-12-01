"use client";

import React, { useState } from "react";
import {
  Card,
  Button,
  Progress,
  Timeline,
  Alert,
  Upload,
  Select,
  Form,
  Typography,
} from "antd";
import {
  PlayCircleOutlined,
  UploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { Text } = Typography;

// Definição dos tipos de dados
const dataTypes = [
  {
    label: "Conteúdo de Disciplina",
    value: "conteudo_disciplina",
  },
  {
    label: "Notas de Aulas",
    value: "notas_aulas",
  },
  {
    label:
      "Procedimentos Referentes à Plataforma Educacional e/ou da Disciplina",
    value: "procedimentos_plataforma",
  },
  {
    label: "Datas de Provas e Atividades",
    value: "datas_provas_atividades",
  },
  {
    label: "Outros",
    value: "outros",
  },
];

const TrainingCard = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileList, setFileList] = useState([]);
  const [fileTypes, setFileTypes] = useState({});

  // Função para iniciar o treinamento
  const startTraining = () => {
    setIsTraining(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 1000);
  };

  // Função para lidar com mudanças no upload
  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
    // Inicializa os tipos de dados para novos arquivos
    const newFileTypes = { ...fileTypes };
    fileList.forEach((file) => {
      if (!newFileTypes[file.uid]) {
        newFileTypes[file.uid] = [];
      }
    });
    // Remove tipos de dados para arquivos que foram removidos
    Object.keys(newFileTypes).forEach((uid) => {
      if (!fileList.find((file) => file.uid === uid)) {
        delete newFileTypes[uid];
      }
    });
    setFileTypes(newFileTypes);
  };

  // Função para lidar com a seleção de tipos de dados
  const handleTypeChange = (value, uid) => {
    setFileTypes((prev) => ({
      ...prev,
      [uid]: value,
    }));
  };

  // Função para remover um arquivo
  const handleRemove = (file) => {
    const newFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(newFileList);
    const newFileTypes = { ...fileTypes };
    delete newFileTypes[file.uid];
    setFileTypes(newFileTypes);
  };

  // Verifica se o botão de treinamento deve estar desabilitado
  const isTrainingDisabled = () => {
    if (fileList.length === 0) return true;
    // Verifica se todos os arquivos têm pelo menos um tipo selecionado
    return fileList.some(
      (file) => !fileTypes[file.uid] || fileTypes[file.uid].length === 0
    );
  };

  return (
    <Card title="Iniciar Novo Treinamento" className="col-span-1 lg:col-span-2">
      <p className="text-gray-600 mb-4">
        Faça upload dos arquivos e selecione os tipos de dados/informações
        contidos em cada um. Em seguida, inicie o treinamento do chatbot com os
        dados mais recentes.
      </p>
      <Form layout="vertical">
        <Form.Item label="Upload de Arquivos">
          <Upload
            multiple
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={() => false} // Impede o upload automático
            onRemove={handleRemove}
            accept=".pdf,.doc,.docx,.pptx,.txt,.xlsx" // Define os tipos de arquivos aceitos
          >
            <Button icon={<UploadOutlined />}>Selecionar Arquivos</Button>
          </Upload>
        </Form.Item>

        {fileList.length > 0 && (
          <div className="mb-4">
            {fileList.map((file) => (
              <Card
                key={file.uid}
                type="inner"
                title={file.name}
                className="mb-2"
                extra={
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemove(file)}
                  />
                }
              >
                <Form.Item
                  label="Tipo de Dados/Informações"
                  required
                  tooltip="Selecione o(s) tipo(s) de dados/informações contidos no arquivo."
                >
                  <Select
                    mode="multiple"
                    allowClear
                    maxCount={1}
                    placeholder="Selecione os tipos"
                    value={fileTypes[file.uid]}
                    onChange={(value) => handleTypeChange(value, file.uid)}
                  >
                    {dataTypes.map((type) => (
                      <Option key={type.value} value={type.value}>
                        {type.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Card>
            ))}
          </div>
        )}

        <Button
          type="primary"
          icon={<PlayCircleOutlined />}
          size="large"
          onClick={startTraining}
          disabled={isTrainingDisabled() || isTraining}
          className="mb-4"
        >
          Iniciar Treinamento
        </Button>
      </Form>

      {isTraining && (
        <>
          <Progress percent={progress} status="active" />
          <p className="mt-2">
            Status: {progress < 100 ? "Treinando..." : "Concluído"}
          </p>
          <Timeline className="mt-4">
            <Timeline.Item>Processando Arquivos</Timeline.Item>
            <Timeline.Item>Calculando Embeddings</Timeline.Item>
            <Timeline.Item>Gerando Q&As</Timeline.Item>
            {progress === 100 && <Timeline.Item>Finalizando</Timeline.Item>}
          </Timeline>
        </>
      )}

      {progress === 100 && (
        <Alert
          message="Treinamento Concluído"
          description="O treinamento foi concluído com sucesso. As métricas foram atualizadas."
          type="success"
          showIcon
          className="mt-4"
        />
      )}
    </Card>
  );
};

export default TrainingCard;
