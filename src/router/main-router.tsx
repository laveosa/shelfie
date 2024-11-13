import { createBrowserRouter, Link, Navigate } from "react-router-dom";

import App from "@/App.tsx";
import ErrorPage from "@/pages/error-page/ErrorPage.tsx";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import { MessengerSectionRouter } from "@/pages/messenger-section/MessengerSectionRouter.tsx";
import { OrdersSectionRouter } from "@/pages/orders-section/OrdersSectionRouter.tsx";
import { SettingsSectionRouter } from "@/pages/settings-section/SettingsSectionRouting.tsx";
import { SupportSectionRouter } from "@/pages/support-section/SupportSectionRouter.tsx";
import { TransmissionsSectionRouter } from "@/pages/transmissions-section/TransmissionsSectionRouter.tsx";
import { UsersSectionRouter } from "@/pages/users-section/UsersSectionRouter.tsx";
import { ProductsSectionRouter } from "@/pages/products-section/ProductsSectionRouter.tsx";
import RouterGuard from "@/utils/guards/RouterGuard.tsx";

const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Navigate to={NavUrlEnum.DASHBOARD} relative="route" />,
      },
      {
        path: NavUrlEnum.DASHBOARD,
        lazy: async () => {
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
        lazy: async () => {
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
        path: NavUrlEnum.ORDERS,
        lazy: async () => {
          const { OrdersSection } = await import(
            "@/pages/orders-section/OrdersSection.tsx"
          );
          return {
            element: (
              <RouterGuard>
                <OrdersSection />
              </RouterGuard>
            ),
          };
        },
        children: OrdersSectionRouter,
        handle: {
          crumb: () => <Link to={NavUrlEnum.ORDERS}>orders</Link>,
        },
      },
      {
        path: NavUrlEnum.PRODUCTS,
        lazy: async () => {
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
        lazy: async () => {
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
        lazy: async () => {
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
        lazy: async () => {
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
        lazy: async () => {
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
        path: NavUrlEnum.USERS,
        lazy: async () => {
          const { UsersSection } = await import(
            "@/pages/users-section/UsersSection.tsx"
          );
          return {
            element: (
              <RouterGuard>
                <UsersSection />
              </RouterGuard>
            ),
          };
        },
        children: UsersSectionRouter,
        handle: {
          crumb: () => <Link to={NavUrlEnum.USERS}>users</Link>,
        },
      },
    ],
  },
]);

export default mainRouter;
