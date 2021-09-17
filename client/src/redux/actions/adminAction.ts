import { Dispatch } from "redux";
import { ALERT, IAlertType } from "../types/alertType";
import { checkImage, imageUpload } from "../../utils/ImageUpload";

import { getAPI, patchAPI, deleteAPI, postAPI } from "../../utils/FetchData";
import { IUser, IBlog } from "../../utils/TypeScript";

import {
  GET_USER,
  UPDATE_USER,
  DELETE_USER,
  IAdminType,
  DELETE_BLOG,
  GET_BLOGS,
  CHART,
  UPDATE_BLOG_CONTENT,
  UPDATE_BLOG_STATE,
} from "../types/adminTypes";

export const getUsers =
  () => async (dispatch: Dispatch<IAlertType | IAdminType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await getAPI("admin_user");

      dispatch({
        type: GET_USER,
        payload: res.data.users,
      });

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const updateUser =
  (data: IUser, token: string) =>
  async (dispatch: Dispatch<IAlertType | IAdminType>) => {
    try {
      dispatch({ type: UPDATE_USER, payload: data });
      await patchAPI(`admin_user/${data._id}`, { name: data.name }, token);
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const deleteUser =
  (id: string, token: string) =>
  async (dispatch: Dispatch<IAlertType | IAdminType>) => {
    try {
      dispatch({ type: DELETE_USER, payload: id });
      const res = await deleteAPI(`admin_user/${id}`, token);
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const getBlogs =
  () => async (dispatch: Dispatch<IAlertType | IAdminType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await getAPI("admin_blog");

      dispatch({
        type: GET_BLOGS,
        payload: res.data.blogs,
      });

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
export const updateBlog =
  (
    data: IBlog,
    thumbnail: File,
    content: string,
    category: string,
    description: string,
    title: string,
    state: boolean,
    token: string
  ) =>
  async (dispatch: Dispatch<IAlertType | IAdminType>) => {
    let url = "";
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      if (thumbnail) {
        const check = checkImage(thumbnail);
        if (check) return dispatch({ type: ALERT, payload: { errors: check } });

        const photo = await imageUpload(thumbnail);
        url = photo.url;
      }
      dispatch({
        type: UPDATE_BLOG_CONTENT,
        payload: data,
      });
      const res = await patchAPI(
        `blog/${data._id}`,
        {
          title: title ? title : data.title,
          content: content ? content : data.content,
          description: description ? description : data.description,
          category: category ? category : data.category,
          thumbnail: thumbnail ? url : thumbnail,
          state: state ? state : data.state,
        },

        token
      );

      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.data.msg } });
      console.log("fail");
    }
  };

export const deleteBlog =
  (id: string, token: string) =>
  async (dispatch: Dispatch<IAlertType | IAdminType>) => {
    try {
      dispatch({ type: DELETE_BLOG, payload: id });
      const res = await deleteAPI(`admin_blog/${id}`, token);
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
export const stateBlog =
  (blog: IBlog, token: string) =>
  async (dispatch: Dispatch<IAlertType | IAdminType>) => {
    try {
      console.log(blog);
      const newBlog = { ...blog, state: blog.state };
      console.log({ newBlog });
      console.log(blog);
      dispatch({
        type: UPDATE_BLOG_STATE,
        payload: blog,
      });
      const res = await patchAPI(
        `blog/${blog._id}`,
        {
          state: blog.state,
        },

        token
      );
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
export const Chart =
  (year: number, token: string) =>
  async (dispatch: Dispatch<IAlertType | IAdminType>) => {
    try {
      const res = await postAPI(
        `chart`,
        {
          year,
        },

        token
      );
      dispatch({
        type: CHART,
        payload: res.data,
      });

      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
