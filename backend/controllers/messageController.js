const Message = require('../models/Message');
const User = require('../models/User');
const connectCloudinary = require('../config/cloudinary');
const { getReceiverSocketId, io } = require('../config/socket');

//get user profile for messaging
exports.getUserForMessaging = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({_id: { $ne: loggedInUserId } }).select('-password');
    res.status(200).json(filteredUsers);
  } catch (error) {
   console.error("Error in getUsersForMessaging:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
 

//send message between two users
exports.sendMessage = async (req, res) => {
  try {
   const imageUrl = req.file ? await connectCloudinary().uploader.upload(req.file.path) : "";
  const { receiver, message } = req.body;
    const newMsg = await Message.create({
      sender: req.user._id,
      receiver,
      message,
      image:imageUrl.secure_url
    });

    //realtime fuctionality goes here => socket.io
     const receiverSocketId = getReceiverSocketId(receiver);
     if(receiver){
      io.to(receiverSocketId).emit("newMessage", newMsg);
     }

    res.status(201).json(newMsg);
  } catch (error) {
    console.log("Error sending message:", error);
    res.status(500).json({ message: error.message });
  }
};

// get mesages between two users
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.user._id }
      ]
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: error.message });
  }
};




