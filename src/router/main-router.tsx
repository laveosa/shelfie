import { createBrowserRouter, Link, Navigate } from "react-router-dom";
import { JSX } from "react";

import App from "@/App.tsx";
import ErrorPage from "@/pages/error-page/ErrorPage.tsx";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import { MessengerSectionRouter } from "@/router/MessengerSectionRouter.tsx";
import { SalesSectionRouter } from "@/router/SalesSectionRouter.tsx";
import { SettingsSectionRouter } from "@/router/SettingsSectionRouting.tsx";
import { SupportSectionRouter } from "@/router/SupportSectionRouter.tsx";
import { TransmissionsSectionRouter } from "@/router/TransmissionsSectionRouter.tsx";
import { CustomersSectionRouter } from "@/router/CustomersSectionRouter";
import { ProductsSectionRouter } from "@/router/ProductsSectionRouter.tsx";
import RouterGuard from "@/utils/guards/RouterGuard.tsx";

const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <RouterGuard>
        <App />
      </RouterGuard>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Navigate to={NavUrlEnum.DASHBOARD} relative="route" />,
      },
      {
        path: NavUrlEnum.DASHBOARD,
        lazy: async (): Promise<{ element: JSX.Element }> => {
          const { DashboardPage } = await import(
            "@/pages/dashboard-page/DashboardPage.tsx"
          );
          return {
            element: (
              <RouterGuard>
                <DashboardPage />
              </RouterGuard>
            ),
          };
        },
        handle: {
          crumb: () => <Link to={NavUrlEnum.DASHBOARD}>dashboard</Link>,
        },
      },
      {
        path: NavUrlEnum.MESSENGER,
        lazy: async (): Promise<{ element: JSX.Element }> => {
          const { MessengerSection } = await import(
            "@/pages/messenger-section/MessengerSection.tsx"
          );
          return {
            element: (
              <RouterGuard>
                <MessengerSection />
              </RouterGuard>
            ),
          };
        },
        children: MessengerSectionRouter,
        handle: {
          crumb: () => <Link to={NavUrlEnum.MESSENGER}>messenger</Link>,
        },
      },
      {
        path: NavUrlEnum.SALES,
        lazy: async (): Promise<{ element: JSX.Element }> => {
          const { SalesSection } = await import(
            "@/pages/sales-section/SalesSection.tsx"
          );
          return {
            element: (
              <RouterGuard>
                <SalesSection />
              </RouterGuard>
            ),
          };
        },
        children: SalesSectionRouter,
        handle: {
          crumb: () => <Link to={NavUrlEnum.ORDERS}>orders</Link>,
        },
      },
      {
        path: NavUrlEnum.PRODUCTS,
        lazy: async (): Promise<{ element: JSX.Element }> => {
          const { ProductsSection } = await import(
            "@/pages/products-section/ProductsSection.tsx"
          );
          return {
            element: (
              <RouterGuard>
                <ProductsSection />
              </RouterGuard>
            ),
          };
        },
        children: ProductsSectionRouter,
        handle: {
          crumb: () => <Link to={NavUrlEnum.PRODUCTS}>products</Link>,
        },
      },
      {
        path: NavUrlEnum.PROFILE,
        lazy: async (): Promise<{ element: JSX.Element }> => {
          const { ProfilePage } = await import(
            "@/pages/profile-page/ProfilePage.tsx"
          );
          return {
            element: (
              <RouterGuard>
                <ProfilePage />
              </RouterGuard>
            ),
          };
        },
        handle: {
          crumb: () => <Link to={NavUrlEnum.PROFILE}>profile</Link>,
        },
      },
      {
        path: NavUrlEnum.SETTINGS,
        lazy: async (): Promise<{ element: JSX.Element }> => {
          const { SettingsSection } = await import(
            "@/pages/settings-section/SettingsSection.tsx"
          );
          return {
            element: (
              <RouterGuard>
                <SettingsSection />
              </RouterGuard>
            ),
          };
        },
        children: SettingsSectionRouter,
        handle: {
          crumb: () => <Link to={NavUrlEnum.SETTINGS}>settings</Link>,
        },
      },
      {
        path: NavUrlEnum.SUPPORT,
        lazy: async (): Promise<{ element: JSX.Element }> => {
          const { SupportSection } = await import(
            "@/pages/support-section/SupportSection.tsx"
          );
          return {
            element: (
              <RouterGuard>
                <SupportSection />
              </RouterGuard>
            ),
          };
        },
        children: SupportSectionRouter,
        handle: {
          crumb: () => <Link to={NavUrlEnum.SUPPORT}>support</Link>,
        },
      },
      {
        path: NavUrlEnum.TRANSMISSIONS,
        lazy: async (): Promise<{ element: JSX.Element }> => {
          const { TransmissionsSection } = await import(
            "@/pages/transmissions-section/TransmissionsSection.tsx"
          );
          return {
            element: (
              <RouterGuard>
                <TransmissionsSection />
              </RouterGuard>
            ),
          };
        },
        children: TransmissionsSectionRouter,
        handle: {
          crumb: () => <Link to={NavUrlEnum.TRANSMISSIONS}>transmissions</Link>,
        },
      },
      {
        path: NavUrlEnum.CUSTOMERS,
        lazy: async (): Promise<{ element: JSX.Element }> => {
          const { CustomersSection } = await import("@/pages/customers-section/CustomersSection.tsx"
          );
          return {
            element: (
              <RouterGuard>
                <CustomersSection />
              </RouterGuard>
            ),
          };
        },
        children: CustomersSectionRouter,
        handle: {
          crumb: () => <Link to={NavUrlEnum.CUSTOMERS}>customers</Link>,
        },
      },
    ],
  },
  {
    path: NavUrlEnum.AUTH,
    lazy: async (): Promise<{ element: JSX.Element }> => {
      const { AuthWrapper } = await import("@/pages/auth-page/AuthWrapper.tsx");
      return {
        element: <AuthWrapper />,
      };
    },
  },
]);

export default mainRouter;
