const Rooms = require("../models/room.model");
const userRoute = require("../models/user.model")
const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.createUser =  (req, res, next) => {
    User.find({email: req.body.email}).exec()
    .then(user => {
        if(user.length >= 1){
            return res.status(409).json({
                message: "Email already exists"
            })
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
    })
}

exports.deleteUserById = (req, res, next) => {
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
    
}
