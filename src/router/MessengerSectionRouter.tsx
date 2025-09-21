import { RouteObject } from "react-router-dom";
import { JSX } from "react";

export const MessengerSectionRouter: RouteObject[] = [
  {
    index: true,
    lazy: async (): Promise<{ element: JSX.Element }> => {
      const { MessengerPage } = await import(
        "@/pages/messenger-section/pages/messenger-page/MessengerPage.tsx"
      );
      return {
        element: <MessengerPage />,
      };
    },
  },
] as RouteObject[];
