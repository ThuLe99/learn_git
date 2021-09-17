import { ChangeEvent, FormEvent } from "react";
import rootReducer from "../redux/reducers/index";

export type InputChange = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

export type FormSubmit = FormEvent<HTMLFormElement>;

export type RootStore = ReturnType<typeof rootReducer>;
export type InputEvent = React.ChangeEvent<HTMLInputElement>;

export interface EventTarget {
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    useCapture?: boolean
  ): void;
  dispatchEvent(evt: Event): boolean;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    useCapture?: boolean
  ): void;
}

export interface IParams {
  page: string;
  slug: string;
}

export interface IUserLogin {
  account: string;
  password: string;
}

export interface IUserRegister extends IUserLogin {
  name: string;
  cf_password: string;
}

export interface IUser extends IUserLogin {
  avatar: string;
  createdAt: string;
  name: string;
  role: string;
  type: string;
  updatedAt: string;
  _id: string;
  followers: IUser[];
  following: IUser[];
}

export interface IUserProfile extends IUserRegister {
  avatar: string | File;
}

export interface IAlert {
  loading?: boolean;
  success?: string | string[];
  errors?: string | string[];
}

// export interface ISocket{
//   connected?: string | string[]
//   disconnected?: string | string[]
// }

export interface ICategory {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBlog {
  _id?: string;
  user: string | IUser;
  title: string;
  content: string;
  description: string;
  thumbnail: string | File;
  category: string;
  createdAt: string;
  state: boolean;
  //
  likes: IUser[];
  viewer: number;
}
export interface IComment {
  _id?: string;
  user: IUser;
  blog_id: string;
  blog_user_id: string;
  content: string;
  replyCM?: IComment[];
  reply_user?: IUser;
  comment_root?: string;
  createdAt: string;
}

export interface ILike {
  user: IUser;
  blog_id: string;
  blog_user_id: string;
  createdAt: string;
}
export interface IUnlike {
  user: IUser;
  blog_id: string;
  blog_user_id: string;
  createdAt: string;
}
export interface IMedia {
  public_id: string;
  URL: string;
}
export interface IMess {
  text: string;
  call: Object;
  media: IMedia[];
}
export interface IConversation {
  _id?: string;
  recipients: IUser;
  message: IMess[];
}

export interface IMessage {
  _id?: string;
  conversation: IConversation;
  sender: IUser;
  recipient: IUser;
  message: IMess[];
  result: number;
  createdAt: string;
}

export interface Chart {
  month: number;
  blog: number;
}
