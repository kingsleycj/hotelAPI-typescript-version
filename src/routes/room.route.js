const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { fetchAllRooms, fetchSingleRoomById, editRoomById, deleteSingleRoomById, createSingleRoom } = require("../controllers/room.controller");

//  fetch all rooms
router.get("/", fetchAllRooms );

//  create a new room
router.post("/", createSingleRoom);

//  edit a room
router.patch('/:roomId', editRoomById)

//  fetch a single room by Id
router.get("/:roomId", fetchSingleRoomById );

//  delete single room by Id
router.delete("/:roomId", deleteSingleRoomById);

module.exports = router;
