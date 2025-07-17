import { lazy, Suspense } from "react";
import { ToastProvider } from "@/utils/services/ToastService.tsx";
import AuthGuard from "@/utils/guards/AuthGuard.tsx";

const AuthPage = lazy(() => import("./AuthPage"));

export function AuthWrapper() {
  return (
    <ToastProvider>
      <AuthGuard>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthPage />
        </Suspense>
      </AuthGuard>
    </ToastProvider>
  );
}
