import express from "express"
import router from express.Router();
import authUser from "../middlewares/authentication";
import { validatorSchema } from "../middlewares/validation";
import userController from "../controllers/user.controller";

// create a new user**
router.post("/", validatorSchema, authUser, userController.createUser);

//  fetch single user by Id
router.get("/:id", validatorSchema, userController.fetchSingleUserById);

//  fetch all users
router.get("/:id/", validatorSchema, authUser, userController.fetchAllUsers);

//  edit user by Id
router.patch("/:id", validatorSchema, authUser, userController.editUserById);

//  delete user by Id**
router.delete("/:id", validatorSchema, authUser, userController.deleteUserById);

export default router;
