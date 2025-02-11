import React, { createContext, useContext, useState } from "react";
import SheToast from "@/components/complex/she-toast/SheToast.tsx";

interface Toast {
  id?: string;
  title?: string;
  message: string;
  description?: string;
  type?: "success" | "error" | "info" | "warning";
}

interface ToastContextType {
  addToast: (toast: Toast) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Toast) => {
    const id = Date.now().toString();

    if (toasts.length >= 3) {
      removeToast(toasts[0].id!);
    }

    setToasts((prev) => [...prev, { ...toast, id }]);

    // setTimeout(() => {
    //   removeToast(id);
    // }, 3000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div
        className="toast-container"
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: "1000",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {toasts.map((toast) => (
          <SheToast
            key={toast.id}
            {...toast}
            dismiss={() => removeToast(toast.id!)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
