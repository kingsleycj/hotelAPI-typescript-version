const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const verifyJWT = require("../middlewares/authentication");
const authUser = require("../middlewares/authorization");
const controller = require("../controller/controller");
const { validatorSchema } = require("../middlewares/validator");

router.post("/", validatorSchema, verifyJWT, authUser, controller.createRoom);
router.get("/:id", validatorSchema, controller.fetchSingleRoomById);
router.get(
  "/:id/",
  validatorSchema,
  verifyJWT,
  authUser,
  controller.fetchAllRooms
);
router.patch(
  "/:id",
  validatorSchema,
  verifyJWT,
  authUser,
  controller.editRoomById
);
router.delete(
  "/:id",
  validatorSchema,
  verifyJWT,
  authUser,
  controller.deleteRoomById
);

module.exports = router;
