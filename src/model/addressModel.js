const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    line1: { type: String, required: true },
    line2: { type: String, default: "" },
    country: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
  },
  { timestamps: true },
);

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;
