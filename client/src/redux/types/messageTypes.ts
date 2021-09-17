import { IUser, IMessage, IMess, IComment, IConversation } from "../../utils/TypeScript";
export const ADD_USER = "ADD_USER";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const GET_CONVERSATIONS = "GET_CONVERSATIONS";
export const GET_MESSAGES = "GET_MESSAGES";
export const UPDATE_MESSAGES = "UPDATE_MESSAGES";
export const DELETE_MESSAGES = "DELETE_MESSAGES";
export const DELETE_CONVERSATION = "DELETE_CONVERSATION";
export const CHECK_ONLINE_OFFLINE = "CHECK_ONLINE_OFFLINE";


export interface IMessageState {
    users: IUserMessState[],
    resultUsers: number,
    data: IDataMessState[],
    resultData: number,
    firstLoad: boolean
}
export interface IUserMessState {
    user: IUser,
    mess: IMess

}
export interface IDataMessState {
    message: IMessage[],
    result: number,
    idUser: string,
    page: number
}
//
export interface ICreateMessage {
    type: typeof ADD_USER,
    payload: IUser
}
export interface IAddMessage {
    type: typeof ADD_MESSAGE,
    payload: IMessage
}

export interface IGetMessage {
    type: typeof GET_MESSAGES,
    payload: IMessage[]
}

export interface IGetConversation {
    type: typeof GET_CONVERSATIONS,
    payload: IConversation
}

export type IMessageType = 
| IAddMessage 
| IGetMessage
| IGetConversation
| ICreateMessage
