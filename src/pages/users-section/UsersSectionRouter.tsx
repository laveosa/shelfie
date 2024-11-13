import { RouteObject } from "react-router-dom";

export const UsersSectionRouter: RouteObject[] = [
  {
    index: true,
    lazy: async () => {
      const { UsersPage } = await import(
        "@/pages/users-section/users-page/UsersPage.tsx"
      );
      return {
        element: <UsersPage />,
      };
    },
  },
];
