import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../store/slices/orderSlice";
import { clearCart } from "../store/slices/cartSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, restaurant, total } = useSelector((state) => state.cart);
  const { loading, error } = useSelector((state) => state.order);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    instructions: "",
  });
  const [success, setSuccess] = useState(false);

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-8 text-center">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>
        <div className="mb-8 text-gray-500">Your cart is empty.</div>
      </div>
    );
  }

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      restaurant: restaurant._id,
      items: items.map((item) => ({
        menuItem: item._id,
        quantity: item.quantity,
        price: item.price,
      })),
      deliveryAddress: address,
      paymentMethod: "cash", // For now
      subtotal: total,
      deliveryFee: restaurant.deliveryFee,
      tax: 0,
      tip: 0,
      total: total + (restaurant.deliveryFee || 0),
    };
    try {
      await dispatch(createOrder(orderData)).unwrap();
      setSuccess(true);
      dispatch(clearCart());
      setTimeout(() => navigate("/orders"), 2000);
    } catch (err) {
      // error handled by slice
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      {success ? (
        <div className="text-green-600 text-lg font-semibold mb-8">
          Order placed successfully! Redirecting...
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border rounded-lg p-4 shadow mb-6">
            <h3 className="font-semibold mb-2">Order Summary</h3>
            <div className="mb-2 text-gray-600">From: {restaurant?.name}</div>
            {items.map((item) => (
              <div
                key={item._id}
                className="flex justify-between text-gray-700 mb-1"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between font-semibold mt-2">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>${restaurant.deliveryFee || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between text-lg font-bold mt-2">
              <span>Total</span>
              <span>${(total + (restaurant.deliveryFee || 0)).toFixed(2)}</span>
            </div>
          </div>

          <div className="border rounded-lg p-4 shadow mb-6">
            <h3 className="font-semibold mb-2">Delivery Address</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="street"
                value={address.street}
                onChange={handleChange}
                placeholder="Street Address"
                className="p-2 border rounded"
                required
              />
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleChange}
                placeholder="City"
                className="p-2 border rounded"
                required
              />
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={handleChange}
                placeholder="State"
                className="p-2 border rounded"
                required
              />
              <input
                type="text"
                name="zipCode"
                value={address.zipCode}
                onChange={handleChange}
                placeholder="Zip Code"
                className="p-2 border rounded"
                required
              />
              <input
                type="text"
                name="country"
                value={address.country}
                onChange={handleChange}
                placeholder="Country"
                className="p-2 border rounded"
                required
              />
            </div>
            <textarea
              name="instructions"
              value={address.instructions}
              onChange={handleChange}
              placeholder="Delivery instructions (optional)"
              className="mt-4 p-2 border rounded w-full"
              rows={2}
            />
          </div>

          {error && <div className="text-red-500 mb-2">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition disabled:opacity-50"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Checkout;
