import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const DeliveryPartnerRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user || user.role !== "delivery_partner") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default DeliveryPartnerRoute;
