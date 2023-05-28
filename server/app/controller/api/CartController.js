import Cart from "../../../database/models/CartModel.js";
import Product from "../../../database/models/ProductModel.js";

export const CartController = {
  index: async (req, res) => {
    let cartAll = await Cart.where({ table_id: req.query.table_id })
      .populate("productId")
      .find()
      .sort({ createdAt: -1 });
    return res.json({
      data: cartAll,
      success: true,
      status: 200,
    });
  },
  store: async (req, res) => {
    let data = req.body;
    let { quantity = 1 } = data;
    let productInfo = await Product.findById(data.productId);
    if (productInfo.status == false) {
      return res.json({
        message: "Product is not available",
        status: 400,
      });
    }
    let cartInfo = await Cart.where({ table_id: data.table_id })
      .where({ product_id: data.product_id })
      .findOne();
    if (cartInfo) {
      let qty = cartInfo.quantity + data.quantity;
      if (productInfo.isPreMaid && productInfo.isVariant == false) {
        if (productInfo.stock < qty) {
          return res.json({
            message: "Out Of Stock",
            status: 400,
          });
        }
      } else {
        let stock = productInfo.variant.find(
          (item) => item.name === cartInfo.variant
        );
        if (stock?.stock < qty) {
          return res.json({
            message: "Out Of Stock",
            status: 400,
          });
        }
      }
      cartInfo.quantity = qty;
      cartInfo.total_price = qty * cartInfo.price;
      await cartInfo.save();
    } else {
      if (
        productInfo?.isVariant == true &&
        productInfo.variant.length > 0 &&
        productInfo.isPreMaid
      ) {
        let stock = productInfo.variant.find(
          (item) => item.name === data.variant
        );
        if (stock) {
          if (stock?.stock < quantity) {
            return res.json({
              message: "Out Of Stock",
              status: 400,
            });
          }
        }
        data = {
          ...data,
          variant: stock.name,
          price: stock.price,
          total_price: stock.price * quantity,
        };
      } else if (!productInfo?.isVariant && productInfo?.isPreMaid) {
        if (productInfo.stock < quantity) {
          return res.json({
            message: "Out Of Stock",
            status: 400,
          });
        }
        data = {
          ...data,
          price: productInfo.price,
          total_price: productInfo?.price * quantity,
        };
      } else if (
        productInfo?.isVariant == true &&
        productInfo.variant.length > 0 &&
        !productInfo.isPreMaid
      ) {
        let stock = productInfo.variant.find((item) => (item.name = variant));
        if (!stock) {
          return res.json({
            message: "Out Of Stock",
            status: 400,
          });
        }
        data = {
          ...data,
          variant: stock?.name,
          price: stock?.price,
          total_price: stock.price * quantity,
        };
      } else {
        console.log(productInfo);
        data = {
          ...data,
          price: productInfo?.price,
          total_price: productInfo?.price * quantity,
        };
      }
      await Cart.create(data);
    }

    return res.json({
      success: true,
      status: 200,
    });
  },
  destroy: async (req, res) => {
    let resp = await Cart.deleteOne({ _id: req.params.id });
    return res.json({
      success: true,
      status: 200,
    });
  },
  statusUpdate: async (req, res) => {
    let { status } = req.body;
    let resp = await Cart.findOne({ _id: req.params.id });

    resp.status = status;
    return res.json({
      success: true,
      status: 200,
    });
  },
};
