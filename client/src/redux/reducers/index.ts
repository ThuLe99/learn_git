import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import categories from "./categoryReducer";
import homeBlogs from "./homeBlogsReducer";
import blogsCategory from "./blogsCategoryReducer";
import otherInfo from "./otherInfoReducer";
import blogsUser from "./blogsUserReducer";
import admin from "./adminReducer";
import adminBlogsReducer from "./adminBlogsReducer";
import socket from "./socketReducer";
import comment from "./commentReducer";
import updateBlog from "./updateBlogReducer";
import chart from "./chartReducer";
import like from "./likeReducer";
import search from "./search";
import topBlogs from "./topBlogsReducer";
import message from "./messageReducer";
export default combineReducers({
  auth,
  alert,
  categories,
  homeBlogs,
  blogsCategory,
  otherInfo,
  blogsUser,
  admin,
  adminBlogsReducer,
  socket,
  comment,
  updateBlog,
  chart,
  like,
  search,
  topBlogs,
  message,
});
