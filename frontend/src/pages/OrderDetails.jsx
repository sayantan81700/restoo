import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOrderById } from "../store/slices/orderSlice";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentOrder, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [dispatch, id]);

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Order Details</h2>
      {loading && <div className="text-gray-500">Loading...</div>}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {!loading && currentOrder && (
        <div className="border rounded-lg p-4 shadow">
          <div className="mb-2 text-gray-600 font-semibold">
            Order #{currentOrder._id.slice(-6).toUpperCase()}
          </div>
          <div className="mb-2 text-gray-500 text-sm">
            Placed: {new Date(currentOrder.createdAt).toLocaleString()}
          </div>
          <div className="mb-2 text-gray-500 text-sm">
            Status:{" "}
            <span className="font-semibold text-orange-600">
              {currentOrder.status}
            </span>
          </div>
          <div className="mb-4 text-gray-700">
            From: {currentOrder.restaurant?.name || "Restaurant"}
          </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Items</h3>
            {currentOrder.items.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between text-gray-700 mb-1"
              >
                <span>
                  {item.menuItem?.name || "Item"} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Delivery Address</h3>
            <div className="text-gray-600 text-sm">
              {currentOrder.deliveryAddress?.street},{" "}
              {currentOrder.deliveryAddress?.city},{" "}
              {currentOrder.deliveryAddress?.state},{" "}
              {currentOrder.deliveryAddress?.zipCode},{" "}
              {currentOrder.deliveryAddress?.country}
            </div>
            {currentOrder.deliveryAddress?.instructions && (
              <div className="text-gray-500 text-xs mt-1">
                {currentOrder.deliveryAddress.instructions}
              </div>
            )}
          </div>
          <div className="flex justify-between font-semibold mt-2">
            <span>Subtotal</span>
            <span>${currentOrder.subtotal?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>${currentOrder.deliveryFee || 0}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${currentOrder.tax || 0}</span>
          </div>
          <div className="flex justify-between text-lg font-bold mt-2">
            <span>Total</span>
            <span>${currentOrder.total?.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
