import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router";
import { ThemeProvider } from "./context/ThemeContext";
import { SidebarProvider } from "./context/SidebarContext";
import { Layout } from "./components/Layout";
import { OverviewPage } from "./components/pages/OverviewPage";
import { RiskFindingsPage } from "./components/pages/RiskFindingsPage";
import { BusinessEntitiesRisksPage } from "./components/pages/BusinessEntitiesRisksPage";
import { AssetsRisksPage } from "./components/pages/AssetsRisksPage";
import { BusinessEntitiesPage } from "./components/pages/BusinessEntitiesPage";
import { AssetsPage } from "./components/pages/AssetsPage";
import { ContextEventsPage } from "./components/pages/ContextEventsPage";
import { ManageUsersPage } from "./components/pages/ManageUsersPage";
import { NotificationsPage } from "./components/pages/NotificationsPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: OverviewPage },
      { path: "overview", Component: OverviewPage },
      { path: "risk-findings", Component: RiskFindingsPage },
      { path: "business-entities-risks", Component: BusinessEntitiesRisksPage },
      { path: "assets-risks", Component: AssetsRisksPage },
      { path: "business-entities", Component: BusinessEntitiesPage },
      { path: "assets", Component: AssetsPage },
      { path: "context-events", Component: ContextEventsPage },
      { path: "manage-users", Component: ManageUsersPage },
      { path: "notifications", Component: NotificationsPage },
    ],
  },
]);

export default function App() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <RouterProvider router={router} />
      </SidebarProvider>
    </ThemeProvider>
  );
}