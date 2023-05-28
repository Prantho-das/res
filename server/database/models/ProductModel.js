import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    image: String,
    category: String,
    stock: Number,
    cooking_time: Date,
    variant: [Object],
    isVariant: Boolean,
    isPreMaid: Boolean,
    status: {
        type: Boolean,
        default: true
    },
    created_at:{
        type: Date,
        default: Date.now
    }

});
const Product=mongoose.model('products',productSchema);
export default Product; 