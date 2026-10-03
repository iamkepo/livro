import { HashRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import HomePage from "@/App";
import EstimatePage from "@/pages/EstimatePage";
import ZonesPage from "@/pages/ZonesPage";

function AppLayout() {
  return <Outlet />;
}

export default function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="estimation" element={<EstimatePage />} />
          <Route path="zones" element={<ZonesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
