export const getRestaurants = (req, res) => {
  res.json({ message: "Get all restaurants" });
};

export const createRestaurant = (req, res) => {
  res.json({ message: "Create restaurant" });
};

export const getRestaurantById = (req, res) => {
  res.json({ message: "Get restaurant by ID" });
};

export const updateRestaurant = (req, res) => {
  res.json({ message: "Update restaurant" });
};

export const deleteRestaurant = (req, res) => {
  res.json({ message: "Delete restaurant" });
};

export const getMenuItems = (req, res) => {
  res.json({ message: "Get menu items for restaurant" });
};

export const addMenuItem = (req, res) => {
  res.json({ message: "Add menu item to restaurant" });
};
