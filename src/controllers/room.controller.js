const Rooms = require("../models/room.model");

class Controller {
  // create a new Room
  async createRoom(roomType) {
    try {
      const room = new Room({
        ...roomType,
      });
      return await room.save();
    } catch (err) {
      if (err.message.indexOf("duplicate key error") !== -1) {
        err.message = "Room codeName Assigned, Assign new codeName to Room ...";
      }
      throw err;
    }
  }

  // edit a room
  async editRoomById(id, roomType) {
    return await Rooms.findOneAndUpdate({ _id: id }, roomType);
  }

  // delete a room
  async deleteRoomById(id) {
    return await Rooms.findOneAndDelete({ _id: id });
  }

  // fetch a single room
  async fetchSingleRoomById(id) {
    return await Rooms.findOne({ _id: id });
  }

  // fetch all created room
  async fetchAllRooms() {
    return await Rooms.find({}, "-__v");
  }
}

module.exports = new Controller();
