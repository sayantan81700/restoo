export const getOrders = (req, res) => {
  res.json({ message: "Get all orders" });
};

export const createOrder = (req, res) => {
  res.json({ message: "Create order" });
};

export const getOrderById = (req, res) => {
  res.json({ message: "Get order by ID" });
};

export const updateOrder = (req, res) => {
  res.json({ message: "Update order" });
};

export const deleteOrder = (req, res) => {
  res.json({ message: "Delete order" });
};

export const updateOrderStatus = (req, res) => {
  res.json({ message: "Update order status" });
};

export const cancelOrder = (req, res) => {
  res.json({ message: "Cancel order" });
};
