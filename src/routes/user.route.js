const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const verifyJWT = require("../middlewares/authentication");
const authUser = require("../middlewares/authorization");
const controller = require("../controller/controller");
const { validatorSchema } = require("../middlewares/validator");

const userRoute {
    router.post("/", validatorSchema, verifyJWT, authUser, controller.createUser);
    router.get("/:id", validatorSchema, controller.fetchSingleUserById);
    router.get(
    "/:id/",
    validatorSchema,
    verifyJWT,
    authUser,
    controller.fetchAllUsers
    );
    router.patch(
    "/:id",
    validatorSchema,
    verifyJWT,
    authUser,
    controller.editUserById
    );
    router.delete(
    "/:id",
    validatorSchema,
    verifyJWT,
    authUser,
    controller.deleteUserById
    );
}

module.exports = userRoute;
