import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrders } from "../store/slices/orderSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Your Orders</h2>
      {loading && <div className="text-gray-500">Loading...</div>}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {!loading && !error && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-gray-500">You have no orders yet.</div>
          ) : (
            orders.map((order) => (
              <Link
                key={order._id}
                to={`/orders/${order._id}`}
                className="block border rounded-lg p-4 shadow hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">
                    Order #{order._id.slice(-6).toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">
                    {order.restaurant?.name || "Restaurant"}
                  </span>
                  <span className="font-bold text-orange-600">
                    ${order.total?.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500">{order.status}</span>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
