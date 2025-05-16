import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Markdown from "react-markdown";
import { ESenderType, IMessage } from "@shared/interfaces/Message";
import Feedback from "../Feedback";

type MessageBubbleProps = {
  message: IMessage;
};

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.sender === ESenderType.USER;
  const renderContent = () => {
    return <Markdown>{message.content}</Markdown>;
  };

  const bubbleStyles =
    message.type === "error"
      ? "bg-red-400 text-white"
      : isUser
        ? "bg-primary text-white !not-prose"
        : "bg-white text-black prose prose-sm";

  return (
    <motion.div
      className="w-full mx-auto group/message"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div
        className={`flex flex-col ${isUser ? "items-end" : "items-start"} my-8`}
      >
        <div className="flex items-start">
          {message.sender === ESenderType.ASSISTANT && (
            <div className="h-min p-2 bg-primary rounded-full mr-1">
              <Sparkles color="white" size={18} />
            </div>
          )}
          <div className={`px-6 py-3 rounded-lg ${bubbleStyles}`}>
            {renderContent()}
          </div>
        </div>

        {!isUser && <Feedback messageId={message.id} liked={message.liked} />}
      </div>
    </motion.div>
  );
};

export default MessageBubble;
