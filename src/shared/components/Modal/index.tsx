import { X } from "lucide-react";
import React from "react";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  title: string;
  onClose?: (type: "click" | "esc", target: EventTarget) => void;
  onConfirm?: () => void;
  footer?: {
    hidden?: boolean;
    confirmText?: string;
    cancelText?: string;
  };
};

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  onConfirm,
  title,
  footer,
}) => {
  function handleCloseClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      onClose?.("click", e.target);
    }
  }

  function handleConfirmClick() {
    onConfirm?.();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") onClose?.("esc", e.target);
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleCloseClick}
      onKeyDown={handleKeyDown}
    >
      <div className="bg-white p-4 min-w-md rounded shadow-lg w-3/4 md:w-2/3 lg:w-2/4">
        <header data-modal-header className="flex justify-between pb-6">
          <h2 className="font-medium text-lg">{title}</h2>
          <button data-modal-close onClick={handleCloseClick}>
            <X className="w-full h-full" onClick={handleCloseClick} />
          </button>
        </header>
        {children}
        {!footer?.hidden && (
          <div
            data-modal-footer
            className="flex gap-3 items-center justify-center"
          >
            <button
              data-modal-cancel
              onClick={handleCloseClick}
              className="text-gray-500 w-full hover:bg-gray-200 px-4 py-2 rounded"
            >
              {footer?.cancelText ?? "Cancelar"}
            </button>

            <button
              className="bg-interface brightness-100 hover:brightness-95 text-white px-4 py-2 rounded w-full"
              data-modal-confirm
              onClick={handleConfirmClick}
              data-type="confirm"
            >
              {footer?.confirmText ?? "Confirmar"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
