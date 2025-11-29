import mongoose from "mongoose";

export function validateObjectId(paramName) {
  return (req, res, next) => {
    const value = req.params[paramName];

    if (!mongoose.Types.ObjectId.isValid(value)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    next();
  };
}
