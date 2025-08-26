import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../store/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, restaurant, total, itemCount } = useSelector(
    (state) => state.cart
  );

  const handleQuantityChange = (itemId, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ itemId, quantity }));
  };

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-8 text-center">
        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
        <div className="mb-8 text-gray-500">Your cart is empty.</div>
        <Link
          to="/restaurants"
          className="px-6 py-3 bg-orange-600 text-white rounded-lg shadow hover:bg-orange-700 transition"
        >
          Browse Restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      <div className="mb-4 text-gray-600 font-semibold">
        From: {restaurant?.name}
      </div>
      <div className="mb-8 border rounded-lg p-4 shadow">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between mb-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div>
                <div className="font-semibold">{item.name}</div>
                <div className="text-gray-500 text-sm">${item.price} each</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  handleQuantityChange(item._id, item.quantity - 1)
                }
                className="px-2 py-1 bg-gray-200 rounded"
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span className="px-2">{item.quantity}</span>
              <button
                onClick={() =>
                  handleQuantityChange(item._id, item.quantity + 1)
                }
                className="px-2 py-1 bg-gray-200 rounded"
              >
                +
              </button>
              <button
                onClick={() => handleRemove(item._id)}
                className="ml-4 text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={handleClearCart}
          className="text-sm text-gray-500 hover:text-red-500 hover:underline mt-2"
        >
          Clear Cart
        </button>
      </div>
      <div className="flex justify-between items-center mb-8">
        <div className="font-semibold">Total Items: {itemCount}</div>
        <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => navigate("/checkout")}
          className="px-6 py-3 bg-orange-600 text-white rounded-lg shadow hover:bg-orange-700 transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
