import React, { useState } from "react";
import { sentFeedback } from "@/app/actions";
import { useChatMessages } from "@/shared/hooks/useChatMessages";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import Modal from "../Modal";

type FeedbackProps = {
  messageId: string;
  liked?: boolean;
};
const Feedback = ({ messageId, liked }: FeedbackProps) => {
  const isLiked = liked === true && liked !== undefined;
  const isDisliked = liked === false && liked !== undefined;
  const [likeActive, setLikeActive] = useState(isLiked);
  const [dislikeActive, setDislikeActive] = useState(isDisliked);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState("");
  const { addFeedback } = useChatMessages();

  const handleLikeClick = () => {
    if (likeActive) {
      handleSentFeedback(true);
    } else {
      setDislikeActive(false);
      handleSentFeedback(true);
    }

    setLikeActive(!likeActive);
  };

  const handleDislikeClick = () => {
    if (dislikeActive) {
      setDislikeActive(false);
      handleSentFeedback(false);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleDislikeSubmit = (reason: string) => {
    setDislikeActive(true);
    setLikeActive(false);
    handleSentFeedback(false, reason);
    setIsModalOpen(false);
  };

  const handleSentFeedback = async (liked: boolean, reason?: string) => {
    try {
      await sentFeedback({
        id: messageId,
        liked,
        dislikeReason: reason,
      });
      addFeedback(messageId, liked);
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <div className="flex mt-1 w-full justify-end px-2">
      <div className="space-x-2">
        <button
          onClick={handleLikeClick}
          className={
            likeActive ? "text-green-500" : "text-gray-400 hover:scale-105"
          }
        >
          <ThumbsUp size={18} fill={likeActive ? "currentColor" : "none"} />
        </button>
        <button
          onClick={handleDislikeClick}
          className={
            dislikeActive ? "text-red-500" : "text-gray-400 hover:scale-105"
          }
        >
          <ThumbsDown
            size={18}
            fill={dislikeActive ? "currentColor" : "none"}
          />
        </button>
      </div>
      <Modal
        title="Motivo"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          handleDislikeSubmit(reason);
        }}
        footer={{
          confirmText: "Enviar",
          cancelText: "Cancelar",
        }}
      >
        <textarea
          autoFocus
          className="w-full border resize-none p-2 rounded mb-2 focus:outline-none"
          placeholder="Descreva o motivo..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default Feedback;
