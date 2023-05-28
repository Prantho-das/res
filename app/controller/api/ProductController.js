import Product from "../../../database/models/ProductModel.js";

export const ProductController = {
  index: async (req, res) => {
    let productAll = await Product.find().sort({ createdAt: -1 });
    return res.json({
      data: productAll,
      success: true,
      status: 200,
    });
  },
  store: async (req, res) => {
    let data = req.body;
    try {
      await Product.create(data);
      return res.json({
        success: true,
        status: 200,
      });
    } catch (error) {
      return res.json({
        success: false,
        status: 500,
      });
    }
  },
  show: async (req, res) => {
    let resp = await Product.findById(req.params.id);
    return res.json({
      success: true,
      status: 200,
      data: resp || {},
    });
  },
  update: async (req, res) => {
    let {
      name,
      price,
      description,
      image,
      category,
      stock,
      cooking_time,
      variant,
      isVariant,
      isPreMaid,
    } = req.body;
    let resp = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        name,
        price,
        description,
        image,
        category,
        stock,
        cooking_time,
        variant,
        isVariant,
        isPreMaid,
      },
      {
        new: true,
      }
    );
    return res.json({
      success: true,
      status: 200,
      data: resp || {},
    });
  },
  destroy: async (req, res) => {
    let resp = await Product.deleteOne({ _id: req.params.id });
    return res.json({
      success: true,
      status: 200,
    });
  },
  stockUpdate: async (req, res) => {
    let {
      name,
      price,
      description,
      image,
      category,
      stock,
      cooking_time,
      variant,
      isVariant,
      isPreMaid,
    } = req.body;
    let resp = await Product.findOne({ _id: req.params.id });

    if (resp.isVariant == true && resp.variant.length > 0 && resp.isPreMaid) {
      resp.variant.map((item) => {
        if (item.name == req.params.variant_name) {
          item.stock = stock;
        }
      });
    } else if (resp.isVariant == false && !resp.isPreMaid) {
      resp.stock = stock;
    }
    return res.json({
      success: true,
      status: 200
    });
  },
};
