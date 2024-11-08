import { RouteObject } from "react-router-dom";

export const MessengerSectionRouter: RouteObject[] = [
  {
    index: true,
    lazy: async () => {
      const { MessengerPage } = await import(
        "@/pages/messenger-section/pages/messenger-page/MessengerPage.tsx"
      );
      return {
        element: <MessengerPage />,
      };
    },
  },
];
