import { RouteObject } from "react-router-dom";
import { JSX } from "react";

export const SettingsSectionRouter: RouteObject[] = [
  {
    index: true,
    lazy: async (): Promise<{ element: JSX.Element }> => {
      const { SettingsPage } = await import(
        "@/pages/settings-section/settings-page/SettingsPage.tsx"
      );
      return {
        element: <SettingsPage />,
      };
    },
  },
] as RouteObject[];
