import mongoose from "mongoose";

const tableSchema = mongoose.Schema({
  name: String,
  floor: String,
  description: String,
  image: String,
  people: Number,
  type: String,
  isBooked: Boolean,
  isReserved: Boolean,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Table = mongoose.model("tables", tableSchema);
export default Table;
