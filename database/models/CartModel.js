import mongoose from "mongoose";
const cartSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    default: null,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    default: null,
  },
  tableId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tables",
    default: null,
  },
  quantity: Number,
  price: Number,
  total_price: Number,
  circular_discount: {
    type: Number,
    default: 0,
  },
  circular_discount_type: {
    type: Number,
    default: 0,
  },
  circular_discount_amount: {
    type: Number,
    default: 0,
  },
  circular_discount_number: {
    type: String,
    default: null,
  },
  note: String,
  variant:{
    type: String,
    default: null
  },
  status: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Cart = mongoose.model("carts", cartSchema);

export default Cart;
