import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { restaurantAPI } from "../../services/api";

export const fetchRestaurants = createAsyncThunk(
  "restaurant/fetchRestaurants",
  async (params, { rejectWithValue }) => {
    try {
      const response = await restaurantAPI.getRestaurants(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch restaurants"
      );
    }
  }
);

export const fetchRestaurantById = createAsyncThunk(
  "restaurant/fetchRestaurantById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await restaurantAPI.getRestaurantById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch restaurant"
      );
    }
  }
);

export const fetchMenuItems = createAsyncThunk(
  "restaurant/fetchMenuItems",
  async (restaurantId, { rejectWithValue }) => {
    try {
      const response = await restaurantAPI.getMenuItems(restaurantId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch menu items"
      );
    }
  }
);

const initialState = {
  restaurants: [],
  currentRestaurant: null,
  menuItems: [],
  loading: false,
  error: null,
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentRestaurant: (state) => {
      state.currentRestaurant = null;
      state.menuItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Restaurants
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload.restaurants;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Restaurant by ID
      .addCase(fetchRestaurantById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurantById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRestaurant = action.payload.restaurant;
      })
      .addCase(fetchRestaurantById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Menu Items
      .addCase(fetchMenuItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.loading = false;
        state.menuItems = action.payload.menuItems;
      })
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentRestaurant } = restaurantSlice.actions;
export default restaurantSlice.reducer;
