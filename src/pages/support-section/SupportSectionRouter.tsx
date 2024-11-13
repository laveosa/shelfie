import { RouteObject } from "react-router-dom";

export const SupportSectionRouter: RouteObject[] = [
  {
    index: true,
    lazy: async () => {
      const { SupportPage } = await import(
        "@/pages/support-section/support-page/SupportPage.tsx"
      );
      return {
        element: <SupportPage />,
      };
    },
  },
];
