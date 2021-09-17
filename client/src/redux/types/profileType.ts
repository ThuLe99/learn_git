import { IUser } from '../../utils/TypeScript'

export const GET_OTHER_INFO = "GET_OTHER_INFO"
export const FOLLOW = "FOLLOW"
export const UN_FOLLOW = "UN_FOLLOW"

export interface IGetOtherInfoType {
  type: typeof GET_OTHER_INFO,
  payload: IUser
}

export interface IFollow {
  type: typeof FOLLOW,
  payload: IUser
}

export interface IUnfollow {
  type: typeof UN_FOLLOW,
  payload: IUser
}

export type IProfileType  = 
|IGetOtherInfoType
|IFollow
|IUnfollow