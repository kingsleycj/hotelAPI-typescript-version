import Room from "../models/room.model"
import mongoose from "mongoose"


const createSingleRoom = (req: Request, res: Response, next: NextFunction) => {
    const room = new Room({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        roomType: req.body.roomType
    })
    room.save()
    .then( result =>{
        console.log(result);
        res.status(201).json({
            message: "Room Created successfully",
            createdProduct: {
            name: result.name,
            price: result.price,
            roomType: req.body.roomType
            },
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

const fetchAllRooms = (req: Request, res: Response, next: NextFunction) => {
  Room.find()
    .select("name price _id roomType")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        products: docs.map((doc) => {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            roomType: doc.roomType
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

const fetchSingleRoomById =(req: Request, res: Response, next: NextFunction) => {
const id = req.params.productId;
Room.findById(id)
  .exec()
  .then((doc) => {
    console.log("From database:", doc);
    if (doc) {
      res.status(200).json({
        message: "Room fetched successfully",
        fetchedProduct: {
          name: doc.name,
          price: doc.price
        },
      });
    } else {
      res.status(401).json({ message: "No valid entry found for provided ID" });
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ error: err });
  });
};

const editRoomById = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.roomId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    Room.update({ _id: id }, { $set: updateOps })
      .exec()
      .then((result) => {
        console.log(result);
        res.status(200).json({
          message: "product updated successfully"
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
};

const deleteSingleRoomById = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.productId;
    Room.remove({_id : id })
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Room deleted successfully"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
}

export default {
  deleteSingleRoomById,
  createSingleRoom,
  editRoomById,
  fetchSingleRoomById,
  fetchAllRooms
};