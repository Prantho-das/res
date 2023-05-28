import express from "express";
import { ProductController } from "../app/controller/api/ProductController.js";
import { TableController } from "../app/controller/api/TableController.js";
import { CartController } from "../app/controller/api/CartController.js";
import { AuthController } from "../app/controller/api/auth/AuthController.js";
import { auth } from "../app/Middleware/AuthMiddleware.js";
let apiRouter = express.Router();

apiRouter.post('/register', AuthController.register );
apiRouter.post('/login', AuthController.login );



apiRouter.get("/products", ProductController.index);
apiRouter.post("/product", ProductController.store);
apiRouter.get("/product/:id", ProductController.show);
apiRouter.put("/product/:id", ProductController.update);
apiRouter.post("/product/:id", ProductController.stockUpdate);
apiRouter.delete("/product/:id", ProductController.destroy);


apiRouter.get("/tables",auth, TableController.index);
apiRouter.post("/table", TableController.store);
apiRouter.get("/table/:id", TableController.show);
apiRouter.put("/table/:id", TableController.update);
apiRouter.delete("/table/:id", TableController.destroy);




apiRouter.get("/carts", CartController.index);
apiRouter.post("/cart", CartController.store);
apiRouter.delete("/cart/:id", CartController.destroy);

export default apiRouter;
