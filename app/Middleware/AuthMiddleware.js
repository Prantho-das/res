import jwt from "jsonwebtoken";
import User from "../../database/models/UserModel.js";

export const auth = async (req, res, next) => {
  if (!req?.headers?.authorization) {
    next({
      status: 401,
      message: "Unauthorized",
    });
  }
  let auth = req.headers.authorization;
  let tokens = auth.split(" ");
  if (tokens.length < 2) {
    next({
      status: 401,
      message: "Unauthorized",
    });
  }
  let token = tokens[1];
  let tokenType = tokens[0];
  let decodeRes = jwt.decode(token);
  jwt.verify(token, process.env.JWT_SECRET || "secret", async (err, decode) => {
    if (err) {
      next({
        status: 401,
        message: "Unauthorized",
      });
    }
    
  });
  let decode = jwt.decode(token);
  let userInfo = await User.findOne({ _id: decode.id });
    if (!userInfo) {
      next({
        status: 401,
        message: "Unauthorized",
      });
    }
    req["user"] = userInfo;
    next();
};
export const guest = (req, res, next) => {};
