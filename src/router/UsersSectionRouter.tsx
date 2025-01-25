import { RouteObject } from "react-router-dom";
import { JSX } from "react";

export const UsersSectionRouter: RouteObject[] = [
  {
    index: true,
    lazy: async (): Promise<{ element: JSX.Element }> => {
      const { UsersPage } = await import(
        "@/pages/users-section/users-page/UsersPage.tsx"
      );
      return {
        element: <UsersPage />,
      };
    },
  },
];
