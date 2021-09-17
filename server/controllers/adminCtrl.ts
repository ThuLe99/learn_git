import { Request, Response } from "express";
import User from "../models/userModel";
import Blogs from "../models/blogModel";
import { IReqAuth } from "../config/interface";

const adminCtrl = {
  getUsers: async (req: Request, res: Response) => {
    try {
      const users = await User.find().sort("-name");
      res.json({ users });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteUser: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });

    if (req.user.role !== "admin")
      return res.status(400).json({ msg: "Invalid Authentication." });

    try {
      const user = await User.findByIdAndDelete(req.params.id);

      res.json({ msg: "Delete Success!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateBlog: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });

    if (req.user.role !== "admin")
      return res.status(400).json({ msg: "Invalid Authentication." });

    try {
      const blog = await Blogs.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $set: req.body,
        },
        { new: true }
      );

      res.json({ msg: "Update Success!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getBlogs: async (req: Request, res: Response) => {
    try {
      const blogs = await Blogs.find().sort("-name");
      res.json({ blogs });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteBlog: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });

    if (req.user.role !== "admin")
      return res.status(400).json({ msg: "Invalid Authentication." });

    try {
      const user = await Blogs.findByIdAndDelete(req.params.id);

      res.json({ msg: "Delete Success!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default adminCtrl;
