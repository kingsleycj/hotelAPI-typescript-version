
import userRoute from "../models/user.model"
import express from "express"
import mongoose from "mongoose"
import User from "../models/user.model"
import bcrypt from "bcrypt"

const createUser = (req: Request, res: Response, next: NextFunction) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Email already exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "User Created",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
};

const editUserById = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.roomId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  User.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "User details updated successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

const fetchSingleUserById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  User.findById(id)
    .exec()
    .then((doc) => {
      console.log("From database:", doc);
      if (doc) {
        res.status(200).json({
          message: "User fetched successfully",
          fetchedProduct: {
            name: doc.name,
            role: doc.role,
          },
        });
      } else {
        res
          .status(401)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

const fetchAllUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find()
    .select("name role _id ")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        products: docs.map((doc) => {
          return {
            name: doc.name,
            role: doc.role,
            _id: doc._id,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

const deleteUserById = (req: Request, res: Response, next: NextFunction) => {
  User.remove({
    _id: req.params.userId,
  })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "User deleted successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

export default {
  createUser,
  deleteUserById,
  fetchAllUsers,
  editUserById,
  fetchSingleUserById,
};