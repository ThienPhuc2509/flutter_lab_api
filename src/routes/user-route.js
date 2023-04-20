const userRouter = require("express").Router();
const userController = require("../controllers/user-controller");

userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.login);
userRouter.put("/update-user", userController.updateUser);

module.exports = userRouter;
