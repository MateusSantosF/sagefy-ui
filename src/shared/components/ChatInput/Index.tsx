import { useInterfaceProps } from "@/shared/contexts/InterfacePropsContext";
import { getTextColor } from "@/shared/utils/getTextColor";
import React, { useState } from "react";
import Disclaimer from "../Disclaimer";

type ChatInputProps = {
  onSend: (message: string) => void;
  loading?: boolean;
};

const ChatInput = ({ onSend, loading = false }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const { color } = useInterfaceProps();

  const textColor = getTextColor(color);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() !== "") {
      onSend(message);
      setMessage("");
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="relative flex h-11 w-full px-3">
        <button
          disabled={message.trim() === "" || loading}
          className={`!absolute right-6 top-[6px] z-10 select-none rounded py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase shadow-md transition-all focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none ${
            message.trim() === ""
              ? `bg-gray-300 text-gray-600 cursor-not-allowed`
              : `bg-interface ${textColor} shadow-interface/80 hover:shadow-lg hover:shadow-interface`
          }`}
          type="submit"
        >
          Enviar
        </button>

        <textarea
          className="h-[97%] w-full resize-none overflow-hidden rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-3 pr-20 text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          placeholder="Digite sua mensagem..."
          value={message}
          rows={1}
          onKeyDown={handleKeyDown}
          maxLength={500}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </form>
      <Disclaimer />
    </>
  );
};

export default ChatInput;
