import React, { useEffect, useState } from "react";
import { Title } from "../App.tsx";

interface ModalProps {
  type?: Title;
  message?: string;
  onBtnOk: () => void;
  timeout?: number;
  isOpen?: boolean;
  onClose: () => void;
  onOpen?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  type,
  message,
  onBtnOk,
  isOpen,
  onClose,
  timeout,
}: ModalProps) => {
  const [visible, setVisible] = useState(isOpen);
  const [remainingTime, setRemainingTime] = useState(timeout || 0);

  useEffect(() => {
    setVisible(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (timeout) {
      const timer = setTimeout(() => {
        onClose();
      }, timeout * 1000);

      return () => clearTimeout(timer);
    }
  }, [timeout, onClose]);

  const handleOkClick = () => {
    onBtnOk();
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (visible) {
      document.addEventListener("keydown", handleKeyDown as never);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown as never);
    };
  }, []);

  useEffect(() => {
    if (remainingTime > 0) {
      const interval = setInterval(() => {
        setRemainingTime((prevRemainingTime) => prevRemainingTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [remainingTime]);

  return (
    <div className={`modal ${visible ? "visible" : ""}`}>
      <div className="modal-content">
        <div
          className={
            type === Title.Info ? "modal-header-info" : "modal-header-warn"
          }
        >
          <h2>{type}</h2>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button onClick={handleOkClick}>
            {remainingTime > 0 ? `OK (${remainingTime}s)` : "OK"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
