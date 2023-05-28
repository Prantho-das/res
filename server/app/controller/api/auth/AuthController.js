import bcrypt from "bcrypt";
import User from "../../../../database/models/UserModel.js";
import jwt from "jsonwebtoken";
import Role from "../../../../database/models/Role.js";
export const AuthController = {
  register: async (req, res) => {
    let data = req.body;
    let userExist = await User.exists({
      phone: data.phone,
    });
    if (userExist) {
      return res.json({
        success: false,
        status: 400,
        message: "User already exist",
      });
    }
    if (data.password !== data.confirm_password) {
      return res.json({
        success: false,
        status: 400,
        message: "Password and confirm password not match",
      });
    }
    data.password = await bcrypt.hashSync(
      data?.password?.toString(),
      parseInt(process.env.SALT_ROUND) || 10
    );
    let userInfo = await User.create(data);

    var token = jwt.sign(
      {
        id: userInfo._id,
        name: userInfo.name,
        phone: userInfo.phone,
        role: userInfo.role,
        email: userInfo.email,
      },
      process.env.JWT_SECRET || "secret"
    );

    let permissions = await Role.find({ name: "customer" }).select(
      "permissions"
    );
    return res.json(logInResponse(token, userInfo, permissions));
  },
  login: async (req, res) => {
    let data = req.body;
    let userInfo = await User.findOne({
      phone: data.phone,
    });
    if (!userInfo) {
      return res.json({
        success: false,
        status: 400,
        message: "User not found",
      });
    }
    bcrypt.compare(data.password?.toString(), userInfo.password, (err, result) => {
      if (err) {
        return res.json({
          success: false,
          status: 400,
          message: "Something went wrong",
        });
      }
    });
    var token = jwt.sign(
      {
        id: userInfo._id,
        name: userInfo.name,
        phone: userInfo.phone,
        role: userInfo.role,
        email: userInfo.email,
      },
      process.env.JWT_SECRET || "secret"
    );

    let permissions = await Role.find({ name: userInfo.role }).select(
      "permissions"
    );
    res.json(logInResponse(token,userInfo,permissions))
  },
  assignRole: (req, res) => {},
  assignPermission: (req, res) => {},
};
let logInResponse = (token, userInfo, permissions) => {
  return {
    success: true,
    status: 200,
    token: token,
    user: {
      name: userInfo.name,
      phone: userInfo.phone,
      role: userInfo.role,
      email: userInfo.email,
      permissions: permissions || [],
    },
  };
};
