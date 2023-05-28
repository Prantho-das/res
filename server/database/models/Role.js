import mongoose from "mongoose";

const roleSchema = mongoose.Schema({
  name: String,
  permissions: [String],
});

const Role = mongoose.model("roles", roleSchema);
export default Role;
