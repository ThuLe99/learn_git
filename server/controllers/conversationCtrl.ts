import { Request, Response } from "express";
import Conversation from "../models/conversationModel";
import { IReqAuth } from "../config/interface";

//new conv
const conversationCtrl = {
  createConversation: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });
    try {
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getConversation:async (req: Request, res: Response) => {
    try {
        const conversation = await Conversation.find({
          members: { $in: [req.params.userId] },
        });
        res.status(200).json(conversation);
      } catch (err) {
        res.status(500).json(err);
      }
  },
  getConversationUser:async (req: Request, res: Response) => {
    try {
        const conversation = await Conversation.findOne({
          members: { $all: [req.params.firstUserId, req.params.secondUserId] },
        });
        res.status(200).json(conversation);
      } catch (err) {
        res.status(500).json(err);
      }
  }
};

export default conversationCtrl;