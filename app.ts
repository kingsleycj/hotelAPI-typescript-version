import express, { Errback, NextFunction, Request, Response } from "express";
import app from express();
import morgan from "morgan"
import bodyParser from "body-parser";
import mongoose, { Error }  from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRoute from "./src/routes/user.route";
import roomRoute from "./src/routes/room.route";
import authUser from './src/middlewares/authentication';

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_ATLAS_DB, {
    // useMongoClient: true,
    // useNewUrlParser: true,
    // useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

// Routes that should handle requests
app.use("/users", userRoute);
app.use("/rooms", roomRoute);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
