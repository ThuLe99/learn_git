   import {ADD_MESSAGE,ADD_USER, GET_CONVERSATIONS,GET_MESSAGES, IMessageType,IUserMessState,ICreateMessage,IMessageState} from "../types/messageTypes"
 import {ALERT, IAlertType } from './../types/alertType';
 import { Dispatch } from "redux";
 import { IUser } from "../../utils/TypeScript";
// import { Socket } from 'socket.io-client'
// import { IMessage } from "../../utils/TypeScript";
// import { postAPI } from "../../utils/FetchData";
// import { IAuth, IAuthType } from "../types/authType";


// export const addUser = (user: IUser, message: IMessageState) => async(dispatch: Dispatch<IAlertType | ICreateMessage>) =>{
//    if(message.users.every(item => item.user._id !== user._id))
//    {
//       dispatch({type: ADD_USER, payload: })
//    }
// }

// export const addMessage = (msg: IMessage, auth: IUser, socket: Socket, token: string) => async (dispatch: Dispatch<IAlertType | IMessageType>) =>{
//     dispatch({type: ADD_MESSAGE,payload: msg})

//     const { _id, avatar, name, account } = auth
//     socket.emit('addMessage', {...msg, user: { _id, avatar, name, account } })
    
//     try {
//         await postAPI('message', msg, token)
//     } catch (err) {
//         dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
//     }
// }