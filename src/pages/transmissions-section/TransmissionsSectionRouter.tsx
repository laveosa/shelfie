import { RouteObject } from "react-router-dom";

export const TransmissionsSectionRouter: RouteObject[] = [
  {
    index: true,
    lazy: async () => {
      const { TransmissionsPage } = await import(
        "@/pages/transmissions-section/transmissions-page/TransmissionsPage.tsx"
      );
      return {
        element: <TransmissionsPage />,
      };
    },
  },
];
