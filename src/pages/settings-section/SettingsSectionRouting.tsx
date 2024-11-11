import { RouteObject } from "react-router-dom";

export const SettingsSectionRouter: RouteObject[] = [
  {
    index: true,
    lazy: async () => {
      const { SettingsPage } = await import(
        "@/pages/settings-section/settings-page/SettingsPage.tsx"
      );
      return {
        element: <SettingsPage />,
      };
    },
  },
];
