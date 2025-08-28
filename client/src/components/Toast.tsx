import { useEffect } from "react";
import { MessageType } from '../types/types';

type ToastProps = {
  message: string | null;
  type: MessageType;
  onClose?: () => void;
};

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeout(() => onClose?.(), 500); // give time for exit animation
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div
      className={`fixed z-50 transition-transform duration-300 ease-in-out
        ${message ? "translate-y-0" : "translate-y-full"}
        w-full bottom-0 px-4 pb-4 sm:pb-6
        sm:w-auto sm:bottom-6 sm:right-6 sm:px-0`}
    >
      <div
        className={`rounded-xl px-4 py-3 shadow-lg text-white font-medium
          ${type === "success" ? "bg-green-600" : "bg-red-600"}
        `}
      >
        {message}
      </div>
    </div>
  );
}