import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  name: {type: String},
  email: {type: String},
  message: {type: String},
  createdAt: { type: Date, default: Date.now }
},
{
  collection: "message"
});

export default mongoose.model("message", messageSchema);