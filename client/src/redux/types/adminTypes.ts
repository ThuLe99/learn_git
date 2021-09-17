import {  IUser, IBlog } from '../../utils/TypeScript'

export const GET_USER = 'GET_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const DELETE_USER = 'DELETE_USER'


export const GET_BLOGS = 'GET_BLOGS'
export const DELETE_BLOG = 'DELETE_BLOG'
export const UPDATE_BLOG_CONTENT = 'UPDATE_BLOG_CONTENT'
export const UPDATE_BLOG_STATE = 'UPDATE_BLOG_STATE'
export const CHART = 'CHART'


export interface IGetUsers{
  type: typeof GET_USER
  payload: IUser[]
}

export interface IUpdateUser{
  type: typeof UPDATE_USER
  payload: IUser
}

export interface IDeleteUser{
  type: typeof DELETE_USER
  payload: string
}

export interface IGetBlogs{
  type: typeof GET_BLOGS
  payload: IBlog[]
}


export interface IDeleteBlog{
  type: typeof DELETE_BLOG
  payload: string
}

export interface IUpdateBlog{
  type: typeof UPDATE_BLOG_CONTENT
  payload: IBlog
}

export interface IUpdateState{
  type: typeof UPDATE_BLOG_STATE
  payload: IBlog
}
export interface IChart{
  type: typeof CHART
  payload: IChart
}
export type IAdminType = 
| IGetUsers
| IUpdateUser
| IDeleteUser
| IDeleteBlog
| IGetBlogs
| IUpdateBlog
| IUpdateState
| IChart


