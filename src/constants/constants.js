require("dotenv").config;

const constants = {
  DATABASE_URI: process.env.DATABASE_URI,
  DATABASES: {
    ROOM: "room",
  },
  MESSAGES: {
    FETCHED: "Room fetched successfully",
    CREATED: "Room created successfully",
    ERROR: "Error Detected",
    DELETE: "Room deleted successfully",
    UPDATE: "Room data updated successfully",
  },

};

module.exports = constants ;
