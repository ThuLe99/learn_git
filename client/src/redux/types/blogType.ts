import { IBlog } from '../../utils/TypeScript'

export const GET_HOME_BLOGS = "GET_HOME_BLOGS"
export const GET_BLOGS_CATEGORY_ID = "GET_BLOGS_CATEGORY_ID"
export const GET_BLOGS_USER_ID = "GET_BLOGS_USER_ID"
export const LIKE = "LIKE"
export const UNLIKE = "UNLIKE"
export const UPDATE_BLOG = "UPDATE_BLOG"
export const SEARCH_BLOG = 'SEARCH_BLOG';
export const GET_LIKE ="GET_LIKE"
export const GET_TOP_BLOG ="GET_TOP_BLOG"
//


export interface IGetTopBlogsType {
  type: typeof GET_TOP_BLOG,
  payload: IBlog[]
}

//
export interface IHomeBlogs {
  _id: string
  name: string
  count: number
  blogs: IBlog[]
}

export interface IGetHomeBlogsType {
  type: typeof GET_HOME_BLOGS,
  payload: IHomeBlogs[]
}

export interface IBlogsCategory {
  id: string
  blogs: IBlog[]
  total: number
  search: string
}

export interface IGetBlogsCategoryType {
  type: typeof GET_BLOGS_CATEGORY_ID,
  payload: IBlogsCategory
}

export interface IBlogsUser {
  id: string
  blogs: IBlog[]
  total: number
  search: string
}

export interface IGetBlogsUserType {
  type: typeof GET_BLOGS_USER_ID,
  payload: IBlogsUser
}


//IUpdateCategory
export interface IUserLike {
  type: typeof UPDATE_BLOG,
  payload: IBlog
}

export interface ISearch {
  type: typeof SEARCH_BLOG,
  payload: IBlog
}

// export interface IUserUnlike {
//   type: typeof UNLIKE,
//   payload: IBlog
// }
export interface ILikeState{
  data: IBlog[],
  total: number
}
export interface IGetLikeType {
  type: typeof GET_LIKE,
  payload: ILikeState
}
//
export type ILikeType =
| IUserLike