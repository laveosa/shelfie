import React, { createContext, useState } from "react";

import SheToast from "@/components/complex/she-toast/SheToast.tsx";
import { ISheToast } from "@/const/interfaces/complex-components/ISheToast.ts";

interface ToastContextType {
  addToast: (toast: ISheToast) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState<ISheToast[]>([]);

  function addToast(toast: ISheToast) {
    const id = Date.now().toString();

    if (toasts.length >= 3) {
      removeToast(toasts[0].id!);
    }

    setToasts((prev) => [...prev, { ...toast, id }]);

    setTimeout(() => {
      removeToast(id);
    }, 3000);
  }

  function removeToast(id: string) {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed top-14 right-2 z-50 flex flex-col gap-2.5">
        {toasts.map((toast) => (
          <SheToast
            key={toast.id}
            {...toast}
            dismissButton={() => removeToast(toast.id!)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export default ToastContext;
