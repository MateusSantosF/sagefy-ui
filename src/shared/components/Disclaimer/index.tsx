import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

const Disclaimer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <p className="text-[0.7em] font-light text-gray-500 text-center py-2">
        Este chat utiliza IA e pode gerar respostas incorretas.{" "}
        <span
          onClick={() => setIsModalOpen(true)}
          className="text-blue-400 font-bold cursor-pointer"
        >
          Leia mais
        </span>
      </p>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Sobre este chatbot</DialogTitle>
          </DialogHeader>
          <section className="flex text-black flex-col gap-3 px-6 pb-3">
            <p>
              As respostas fornecidas por este tutor virtual são geradas
              automaticamente utilizando Inteligência Artificial, baseada na
              técnica de Retrieval-Augmented Generation (RAG), com o objetivo de
              aprimorar o suporte aos alunos do curso técnico em multimeios
              didáticos do campus São João da Boa Vista.
            </p>
            <p>
              Embora nos empenhemos para garantir a precisão e a relevância das
              informações, podem ocorrer erros ou imprecisões.
            </p>

            <p>
              Recomendamos que, antes de tomar qualquer decisão ou ação, você
              consulte as fontes oficiais e, se necessário, entre em contato com
              nossa equipe de atendimento para esclarecer dúvidas específicas.
            </p>

            <p>
              A instituição responsável não se responsabiliza por eventuais
              interpretações incorretas ou decisões tomadas com base nas
              respostas fornecidas pelo tutor virtual.
            </p>
          </section>
          <DialogFooter  className="px-6 gap-3 pb-4">
            <Button onClick={() => setIsModalOpen(false)}>Estou ciente</Button>
            <Button
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Disclaimer;
