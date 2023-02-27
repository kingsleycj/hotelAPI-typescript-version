const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/authentication");
const { validatorSchema } = require("../middlewares/validator");
const userController = require("../controllers/user.controller");

// create a new user
router.post("/", validatorSchema, authUser, userController.createUser);

//  fetch single user by Id
router.get("/:id", validatorSchema, controller.fetchSingleUserById);

//  fetch all users
router.get("/:id/", validatorSchema, authUser, controller.fetchAllUsers);

//  edit user by Id
router.patch("/:id", validatorSchema, authUser, controller.editUserById);

//  delete user by Id
router.delete("/:id", validatorSchema, authUser, userController.deleteUserById);

module.exports = router;
