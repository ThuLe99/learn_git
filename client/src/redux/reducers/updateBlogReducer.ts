import * as types from "../types/blogType";
import { IBlog } from "../../utils/TypeScript";

const updateBlogReducer = (
  state: IBlog[] = [],
  action: types.ILikeType
): IBlog[] => {
  switch (action.type) {
    case types.UPDATE_BLOG:
      console.log(state);
      return state.map((blog) =>
        blog._id === action.payload._id
          ? { ...blog, likes: action.payload.likes }
          : blog
      );

    default:
      return state;
  }
};

export default updateBlogReducer;
