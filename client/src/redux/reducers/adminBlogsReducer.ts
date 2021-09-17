import * as types from "../types/adminTypes";
import {  IBlog } from "../../utils/TypeScript";
const adminBlogsReducer = (
  state: IBlog[] = [],
  action: types.IAdminType
): IBlog[] => {
  switch (action.type) {
    case types.GET_BLOGS:
      return action.payload;

    case types.UPDATE_BLOG_CONTENT:
      return state.map((item) =>
        item._id === action.payload._id
          ? {
              ...item,
              title: action.payload.title,
              content: action.payload.content,
              description: action.payload.description,
              category: action.payload.category,
              thumbnail: action.payload.thumbnail,
    
            }
          : item
      );
    case types.UPDATE_BLOG_STATE:
      return state.map((item) =>
        item._id === action.payload._id
          ? { ...item, state: action.payload.state }
          : item
      );
      

     case types.DELETE_BLOG:
       return state.filter((item) => item._id !== action.payload);

    default:
      return state;
  }
};

export default adminBlogsReducer;
