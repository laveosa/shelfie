import { toast } from "sonner";

interface ToastServiceOptions {
  message: string;
  duration?: number; // Optional duration for the toast
  text?: string;
}

const ToastService = {
  success: ({ message, duration = 3000, ...options }: ToastServiceOptions) => {
    toast.success(message, {
      duration,
      action: {
        text: "Close",
        onClick: () => toast.dismiss(), // Close the toast when clicked
      },
      ...options,
    });
  },
  error: ({ message, duration = 3000, ...options }: ToastServiceOptions) => {
    toast.error(message, {
      duration,
      action: {
        text: "Close",
        onClick: () => toast.dismiss(), // Close the toast when clicked
      },
      ...options,
    });
  },
  info: ({ message, duration = 3000, ...options }: ToastServiceOptions) => {
    toast.info(message, {
      duration,
      action: {
        text: "Close",
        onClick: () => toast.dismiss(), // Close the toast when clicked
      },
      ...options,
    });
  },
  warning: ({ message, duration = 3000, ...options }: ToastServiceOptions) => {
    toast.warning(message, {
      duration,
      action: {
        text: "Close",
        onClick: () => toast.dismiss(), // Close the toast when clicked
      },
      ...options,
    });
  },
};

export default ToastService;
