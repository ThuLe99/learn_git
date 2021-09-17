import { Dispatch } from "redux";
import { IBlog } from "../../utils/TypeScript";
import { imageUpload } from "../../utils/ImageUpload";
import { postAPI, getAPI, patchAPI } from "../../utils/FetchData";
import {Socket} from 'socket.io-client'

import { ALERT, IAlertType } from "../types/alertType";

import {
  GET_HOME_BLOGS,
  IGetHomeBlogsType,
  GET_BLOGS_CATEGORY_ID,
  IGetBlogsCategoryType,
  GET_BLOGS_USER_ID,
  IGetBlogsUserType,
  IGetLikeType,
  GET_LIKE,
  IGetTopBlogsType,
  //
  ILikeType,
  UPDATE_BLOG,
  SEARCH_BLOG,
  GET_TOP_BLOG
} from "../types/blogType";

export const createBlog =
  (blog: IBlog, token: string) => async (dispatch: Dispatch<IAlertType>) => {
    let url;
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      if (typeof blog.thumbnail !== "string") {
        const photo = await imageUpload(blog.thumbnail);
        url = photo.url;
      } else {
        url = blog.thumbnail;
      }
      const newBlog = { ...blog, thumbnail: url };
      const res = await postAPI("blog", newBlog, token);
      console.log(res);
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const getHomeBlogs =
  () => async (dispatch: Dispatch<IAlertType | IGetHomeBlogsType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getAPI("home/blogs");
      dispatch({
        type: GET_HOME_BLOGS,
        payload: res.data,
      });

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
  export const geTopBlogs =
  () => async (dispatch: Dispatch<IAlertType | IGetTopBlogsType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getAPI("topview");
      dispatch({
        type:  GET_TOP_BLOG,
        payload: res.data,
      });
      console.log(res.data)
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      //dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
export const getBlogsByCategoryId =
  (id: string, search: string) =>
  async (dispatch: Dispatch<IAlertType | IGetBlogsCategoryType>) => {
    try {
      let limit = 8;
      let value = search ? search : `?page=${1}`;

      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await getAPI(`blogs/category/${id}${value}&limit=${limit}`);

      dispatch({
        type: GET_BLOGS_CATEGORY_ID,
        payload: { ...res.data, id, search },
      });

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const getBlogsByUserId =
  (id: string, search: string) =>
  async (dispatch: Dispatch<IAlertType | IGetBlogsUserType>) => {
    try {
      let limit = 3;
      let value = search ? search : `?page=${1}`;

      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await getAPI(`blogs/user/${id}${value}&limit=${limit}`);

      dispatch({
        type: GET_BLOGS_USER_ID,
        payload: { ...res.data, id, search },
      });

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const likeBlog =
  (blog: IBlog, token: string) =>
  async (dispatch: Dispatch<IAlertType | ILikeType>) => {
    try {
      console.log(blog);
      const newBlog = { ...blog, likes: [...blog.likes, token] };
      console.log({ newBlog });
      console.log(blog);
      dispatch({
        type: UPDATE_BLOG,
        payload:blog,
      });
      await patchAPI(`blog/like/${blog._id}`,{likes: blog.likes}, token)

    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

    export const getLikes = (
    id: string
  ) => async(dispatch: Dispatch<IAlertType | IGetLikeType>) => {
    try {
 
      const res = await getAPI(`blog/${id}`)
  
      dispatch({
        type: GET_LIKE,
        payload: {
          data: res.data.likes,
          total: res.data.total
        }
      })
      
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
  }

  export const unLikeBlog =
  (blog: IBlog, token: string) =>
  async (dispatch: Dispatch<IAlertType | ILikeType>) => {
    try {
      dispatch({
        type: UPDATE_BLOG,
        payload:blog,
      });
      await patchAPI(`blog/unlike/${blog._id}`,{likes: blog.likes}, token)

    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

  export const searchTask = (title:string) => {
    return {
        type: SEARCH_BLOG,
        title //name, status
    }
}

