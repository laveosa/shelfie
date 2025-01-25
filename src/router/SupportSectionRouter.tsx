import { RouteObject } from "react-router-dom";
import { JSX } from "react";

export const SupportSectionRouter: RouteObject[] = [
  {
    index: true,
    lazy: async (): Promise<{ element: JSX.Element }> => {
      const { SupportPage } = await import(
        "@/pages/support-section/support-page/SupportPage.tsx"
      );
      return {
        element: <SupportPage />,
      };
    },
  },
];
