import express from "express"
import jwt from "jsonwebtoken"
import router from express.Router();
import { fetchAllRooms, fetchSingleRoomById, editRoomById, deleteSingleRoomById, createSingleRoom } from "../controllers/room.controller"
import authUser from '../middlewares/authentication'

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

export default router;
