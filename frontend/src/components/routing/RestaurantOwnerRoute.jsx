import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RestaurantOwnerRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user || user.role !== "restaurant_owner") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RestaurantOwnerRoute;
