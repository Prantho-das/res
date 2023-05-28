import Table from "../../../database/models/TableModel.js";

export const TableController = {
  index: async (req, res) => {
    let productAll = await Table.find().sort({ createdAt: -1 });
    return res.json({
      data: productAll,
      success: true,
      status: 200,
    });
  },
  store: async (req, res) => {
    let data = req.body;
    console.log(req);
    try {
      await Table.create(data);
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
    let resp = await Table.findById(req.params.id);
    return res.json({
      success: true,
      status: 200,
      data: resp || {},
    });
  },
  update: async (req, res) => {
    let {
      name,
      floor,
      description,
      image,
      people,
      type,
      isBooked,
      isReserved,
    } = req.body;
    let resp = await Table.findOneAndUpdate(
      { _id: req.params.id },
      {
        name,
        floor,
        description,
        image,
        people,
        type,
        isBooked,
        isReserved,
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
    let resp = await Table.deleteOne({ _id: req.params.id });
    return res.json({
      success: true,
      status: 200,
    });
  },
};
