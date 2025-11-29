import { Message } from "../models/Message.js";
import { User } from "../models/User.js";
import cloudinary from "../lib/cloudnary.js";
console.log(Message, User);

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getAllContacts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const otherUserId = req.params.id;
    const messages = await Message.find({
      $or: [
        { senderId: loggedInUserId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: loggedInUserId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessagesByUserId:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    console.log(req.user._id);
    const senderId = req.user._id;
    const { id: receiverId } = req.params;
    let imageURL;
    if (image) {
      // Save the image to Cloundinary, then get the URL
      const uploadResult = await cloudinary.uploader.upload(image, {
        folder: "message_attachments",
        resource_type: "auto", // handles images, gifs, etc.
      });
      imageURL = uploadResult.secure_url;
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageURL,
    });
    await newMessage.save();

    //todo:send message in real-time if user is online - socket.io

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllChats = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const chatPartners = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });
    const partnerIds = [
      ...new Set(
        chatPartners.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString()
        )
      ),
    ];
    const partners = await User.find({ _id: { $in: partnerIds } }).select(
      "-password"
    );
    res.status(200).json(partners);
  } catch (error) {
    console.error("Error in getAllChats:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
