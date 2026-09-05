const express = require("express");
const app = express();
const config = require("./config/env.config");
const PORT = config.PORT.port || 5000;
const cors = require("cors");
const { connectDb } = require("./config/db");
//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//routes imports
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const addressRoutes = require("./routes/addressRoutes");

//routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/address", addressRoutes);

//global error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status ?? 500).json({
    message: error.message ? error.message : "Internal server error",
  });
});

//server start functions
const startServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server started at ${`http://localhost:${PORT}`}`);
    });
  } catch (error) {
    console.log(`Internal server error ${error.message}`);
  }
};

startServer();
