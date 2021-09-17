import { Request, Response } from "express";
import Message from "../models/messageModel";
import { IReqAuth } from "../config/interface";

//add
const messageCtrl = {
  createMessage: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });
    const newMessage = new Message(req.body);

    try {
      const savedMessage = await newMessage.save();
      res.status(200).json(savedMessage);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getMessage: async (req: Request, res: Response) => {
    try {
      const messages = await Message.find({
        conversationId: req.params.conversationId,
      });
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
export default messageCtrl;