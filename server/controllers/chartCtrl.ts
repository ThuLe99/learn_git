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
// viet type script luon luon su dung class ko su dung const
const chartCtrl = {


    staticialBlogsWithMonth: async (req: Request, res: Response) => {
        try {
          // tham so tren fe truyen xuong duoi day se la nam
          // 1 nam co 12 month => truc hoanh co 12 cot (bieu do duong hoac bieu do cot)
          // api de medthod post nhe
          // { year : '2021'}
          let promiseBlogs: any = [];
          const { year } = req.body;
          for(let month=1 ; month <= 12 ; month++) {
            promiseBlogs = [...promiseBlogs, async () => {
              // const ketQua = await  Blogs.aggregate([
              //   {$project: {name: 2, month: {$month: '$createdAt'}, year: {$year: '$createdAt'}}},
              //   {$match: {month, year}}
              // ])
              const ketQua = await Blogs.countDocuments({ $expr:{
                $and:[
                {$eq: [{ $year: "$createdAt" }, year]},
                {$eq: [{ $month: "$createdAt" }, month]}
              ]
            }});
              return {
                month,
                ketQua : ketQua || 0
              }
            }]
          }
          const result = await Promise.all([...promiseBlogs.map((item: any)=>item())]);
          res.json(result );
        } catch (err: any) {
          return res.status(500).json({ msg: err.message });
        }
    }
}

export default chartCtrl;
