import { ESenderType, IMessage } from "@/shared/interfaces/Message";
import { motion } from "framer-motion";
import { Markdown } from "../Markdown";
import Feedback from "../Feedback";
import { Sparkles } from "lucide-react";
type MessageBubbleProps = {
  message: IMessage;
};

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.sender === ESenderType.USER;

  return (
    <motion.div
      className="w-full mx-auto group/message "
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
          <div
            className={`px-2 py-2 rounded-lg ${
              isUser ? "bg-primary text-white" : "text-black "
            }`}
          >
            <Markdown>{message.content}</Markdown>
          </div>
        </div>

        {!isUser && <Feedback messageId={message.id} liked={message.liked} />}
      </div>
    </motion.div>
  );
};

export default MessageBubble;
