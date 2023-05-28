import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    password: String,
    role: {
      type: String,
      default: "customer",
    },
    special_permission: [String],
    status: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: String,
      default: "https://i.ibb.co/7tBZgZz/blank-profile-picture-973460-640.png",
    },
    designation: {
      type: String,
      default: "Customer",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", userSchema);
export default User;
