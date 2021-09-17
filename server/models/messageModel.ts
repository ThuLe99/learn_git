import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema(
  {
    conversation: { type: mongoose.Types.ObjectId, ref: 'conversation' },
    sender: { type: mongoose.Types.ObjectId, ref: 'user' },
    recipient: { type: mongoose.Types.ObjectId, ref: 'user' },
    text: String,
    media: Array,
    call: Object
    // o day em eo cho them 1 cai type Message : join, load 
  },
  { timestamps: true }
);
export default mongoose.model('Message', MessageSchema)
