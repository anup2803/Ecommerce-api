const { default: mongoose } = require("mongoose");
const mongooes = require("mongoose");

const userSchema = new mongooes.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    fullName: {
      type: String,
      required: [true, "FullName is required"],
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: [true, "Address is required"],
    },
  },
  {
    timestamps: true,
  },
);

const User = mongooes.model("Users", userSchema);

module.exports = User;
