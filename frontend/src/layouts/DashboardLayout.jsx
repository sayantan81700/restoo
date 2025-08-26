import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
