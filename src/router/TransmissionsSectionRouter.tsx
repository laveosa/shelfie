import { RouteObject } from "react-router-dom";
import { JSX } from "react";

export const TransmissionsSectionRouter: RouteObject[] = [
  {
    index: true,
    lazy: async (): Promise<{ element: JSX.Element }> => {
      const { TransmissionsPage } = await import(
        "@/pages/transmissions-section/transmissions-page/TransmissionsPage.tsx"
      );
      return {
        element: <TransmissionsPage />,
      };
    },
  },
] as RouteObject[];
