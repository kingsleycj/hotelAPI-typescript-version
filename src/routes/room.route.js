const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { fetchAllRooms, fetchSingleRoomById, editRoomById, deleteSingleRoomById, createSingleRoom } = require("../controllers/room.controller");
const authUser = require('../middlewares/authentication');

//  fetch all rooms
router.get("/", fetchAllRooms );

//  create a new room
router.post("/", authUser, createSingleRoom);

//  edit a room
router.patch("/:roomId", authUser, editRoomById);

//  fetch a single room by Id
router.get("/:roomId", fetchSingleRoomById );

//  delete single room by Id
router.delete("/:roomId", authUser, deleteSingleRoomById);

module.exports = router;
