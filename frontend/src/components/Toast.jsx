import React, { useEffect } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import './Toast.css';

function Toast({ mensagem, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast-container">
      <div className="toast-content">
        <FiCheckCircle className="toast-icon" />
        <span>{mensagem}</span>
      </div>
    </div>
  );
}

export default Toast;
