import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  restaurant: null,
  total: 0,
  itemCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { item, restaurant } = action.payload;

      // If cart is empty or same restaurant, add item
      if (!state.restaurant || state.restaurant._id === restaurant._id) {
        const existingItem = state.items.find(
          (cartItem) => cartItem._id === item._id
        );

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push({ ...item, quantity: 1 });
        }

        state.restaurant = restaurant;
        state.itemCount = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        state.total = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      } else {
        // Different restaurant - clear cart and add new item
        state.items = [{ ...item, quantity: 1 }];
        state.restaurant = restaurant;
        state.itemCount = 1;
        state.total = item.price;
      }
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item._id !== itemId);
      state.itemCount = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.total = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      if (state.items.length === 0) {
        state.restaurant = null;
      }
    },

    updateQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.items.find((item) => item._id === itemId);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((item) => item._id !== itemId);
        } else {
          item.quantity = quantity;
        }

        state.itemCount = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        state.total = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );

        if (state.items.length === 0) {
          state.restaurant = null;
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.restaurant = null;
      state.total = 0;
      state.itemCount = 0;
    },

    setCart: (state, action) => {
      const { items, restaurant, total, itemCount } = action.payload;
      state.items = items;
      state.restaurant = restaurant;
      state.total = total;
      state.itemCount = itemCount;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, setCart } =
  cartSlice.actions;

export default cartSlice.reducer;
