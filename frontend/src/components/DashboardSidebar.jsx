import { Link } from "react-router-dom";

const DashboardSidebar = () => (
  <aside className="w-64 bg-white shadow h-screen p-6 hidden md:block">
    <nav className="flex flex-col gap-4">
      <Link to="/admin/dashboard" className="hover:text-orange-600">
        Admin Dashboard
      </Link>
      <Link to="/admin/users" className="hover:text-orange-600">
        Users
      </Link>
      <Link to="/admin/restaurants" className="hover:text-orange-600">
        Restaurants
      </Link>
      <Link to="/admin/orders" className="hover:text-orange-600">
        Orders
      </Link>
      <Link to="/admin/settings" className="hover:text-orange-600">
        Settings
      </Link>
      <hr />
      <Link to="/restaurant/dashboard" className="hover:text-orange-600">
        Restaurant Dashboard
      </Link>
      <Link to="/restaurant/menu" className="hover:text-orange-600">
        Menu
      </Link>
      <Link to="/restaurant/orders" className="hover:text-orange-600">
        Orders
      </Link>
      <Link to="/restaurant/settings" className="hover:text-orange-600">
        Settings
      </Link>
      <hr />
      <Link to="/delivery/dashboard" className="hover:text-orange-600">
        Delivery Dashboard
      </Link>
      <Link to="/delivery/orders" className="hover:text-orange-600">
        Assigned Orders
      </Link>
      <Link to="/delivery/profile" className="hover:text-orange-600">
        Profile
      </Link>
    </nav>
  </aside>
);

export default DashboardSidebar;
