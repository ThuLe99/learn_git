import { Request, Response } from "express";
import Blogs from "../models/blogModel";
import { IReqAuth } from "../config/interface";
import mongoose, { AnyObject } from "mongoose";

const Pagination = (req: IReqAuth) => {
  let page = Number(req.query.page) * 1 || 1;
  let limit = Number(req.query.limit) * 1 || 4;
  let skip = (page - 1) * limit;

  return { page, limit, skip };
};

const blogCtrl = {
  createBlog: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });

    try {
      const { title, content, description, thumbnail, category } = req.body;

      const newBlog = new Blogs({
        user: req.user._id,
        title: title.toLowerCase(),
        content,
        description,
        thumbnail,
        category,
      });

      await newBlog.save();
      res.json({ newBlog });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getHomeBlogs: async (req: Request, res: Response) => {
    try {
      const blogs = await Blogs.aggregate([
        //state
        {
          $match: {
            state: true,
          },
        },

        // User
        {
          $lookup: {
            from: "users",
            let: { user_id: "$user" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
              { $project: { password: 0 } },
            ],
            as: "user",
          },
        },
        // array -> object
        { $unwind: "$user" },
        // Category
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        // array -> object
        { $unwind: "$category" },
        // Sorting
        { $sort: { createdAt: -1 } },
        // Group by category
        {
          $group: {
            _id: "$category._id",
            name: { $first: "$category.name" },
            blogs: { $push: "$$ROOT" },
            count: { $sum: 1 },
          },
        },
        // Pagination for blogs
        {
          $project: {
            blogs: {
              $slice: ["$blogs", 0, 4],
            },
            count: 1,
            name: 1,
          },
        },
      ]);

      res.json(blogs);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getBlogsByCategory: async (req: Request, res: Response) => {
    const { limit, skip } = Pagination(req);

    try {
      const Data = await Blogs.aggregate([
        {
          $match: {
            state: true,
          },
        },
        {
          $facet: {
            totalData: [
              {
                $match: {
                  category: mongoose.Types.ObjectId(req.params.id),
                },
              },
              // User
              {
                $lookup: {
                  from: "users",
                  let: { user_id: "$user" },
                  pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                    { $project: { password: 0 } },
                  ],
                  as: "user",
                },
              },
              // array -> object
              { $unwind: "$user" },
              // Sorting
              { $sort: { createdAt: -1 } },
              { $skip: skip },
              { $limit: limit },
            ],
            totalCount: [
              {
                $match: {
                  category: mongoose.Types.ObjectId(req.params.id),
                },
              },
              { $count: "count" },
            ],
          },
        },
        {
          $project: {
            count: { $arrayElemAt: ["$totalCount.count", 0] },
            totalData: 1,
          },
        },
      ]);

      const blogs = Data[0].totalData;
      const count = Data[0].count;

      // Pagination
      let total = 0;

      if (count % limit === 0) {
        total = count / limit;
      } else {
        total = Math.floor(count / limit) + 1;
      }

      res.json({ blogs, total });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getBlogsByUser: async (req: Request, res: Response) => {
    const { limit, skip } = Pagination(req);

    try {
      const Data = await Blogs.aggregate([
        {
          $match: {
            state: true,
          },
        },
        {
          $facet: {
            totalData: [
              {
                $match: {
                  user: mongoose.Types.ObjectId(req.params.id),
                },
              },
              // User
              {
                $lookup: {
                  from: "users",
                  let: { user_id: "$user" },
                  pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                    { $project: { password: 0 } },
                  ],
                  as: "user",
                },
              },
              // array -> object
              { $unwind: "$user" },
              // Sorting
              { $sort: { createdAt: -1 } },
              { $skip: skip },
              { $limit: limit },
            ],
            totalCount: [
              {
                $match: {
                  user: mongoose.Types.ObjectId(req.params.id),
                },
              },
              { $count: "count" },
            ],
          },
        },
        {
          $project: {
            count: { $arrayElemAt: ["$totalCount.count", 0] },
            totalData: 1,
          },
        },
      ]);

      const blogs = Data[0].totalData;
      const count = Data[0].count;

      // Pagination
      let total = 0;

      if (count % limit === 0) {
        total = count / limit;
      } else {
        total = Math.floor(count / limit) + 1;
      }

      res.json({ blogs, total });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getBlog: async (req: Request, res: Response) => {
    try {
      const blog = await Blogs.findOne({ _id: req.params.id }).populate(
        "user",
        "-password"
      );

      if (!blog) return res.status(400).json({ msg: "Blog does not exist." });

      return res.json(blog);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  likePost: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });

    try {
      const blog = await Blogs.find({
        _id: req.params.id,
        likes: req.user._id,
      });
      if (blog.length > 0)
        return res.status(400).json({ msg: "You liked this post." });

      const like = await Blogs.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { likes: req.user._id },
        },
        { new: true }
      );

      if (!like)
        return res.status(400).json({ msg: "This post does not exist." });

      res.json({ msg: "Liked Post!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  unLikePost: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });

    try {
      const like = await Blogs.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { likes: req.user._id },
        },
        { new: true }
      );

      if (!like)
        return res.status(400).json({ msg: "This post does not exist." });

      res.json({ msg: "UnLiked Post!" });
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
      const category = await Blogs.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          title: req.body.title.toLowerCase(),
          content: req.body.content,
          description: req.body.description,
          thumbnail: req.body.thumbnail,
          category: req.body.category,
          state: req.body.state,
        }
      );

      res.json({ msg: "Update Success!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  blogState: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });
    if (req.user.role !== "admin")
      return res.status(400).json({ msg: "Invalid Authentication." });
    try {
      const state = await Blogs.findOneAndUpdate(
        { _id: req.params.id },
        {
          state: req.body.state,
        }
      );

      res.json({ msg: "Published post !" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  searchBlog: async (req: IReqAuth, res: Response) => {
    
    try {
      const blogs = await Blogs.find({
        title: { $regex: req.query.title },
      })
        .limit(10)
        .select("thumbnail title description user");

      res.json({ blogs });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getView: async (req: Request, res: Response) => {
    try {
      const view = await Blogs.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { viewer: 1 },
        }
      );

      return res.json(view);
      res.json({ msg: "Viewed!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getTopView: async (req: Request, res: Response) => {
    try {
      const view = await Blogs.find().sort("-viewer" ).limit(4);

      return res.json(view);
      res.json({ msg: "Lay!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default blogCtrl;
