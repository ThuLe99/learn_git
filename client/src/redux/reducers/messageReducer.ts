 import { ADD_USER, IMessageState, ADD_MESSAGE, IMessageType } from './../types/messageTypes';
// import { IUser } from '../../utils/TypeScript'
const initialState ={
    users: [],
    resultUsers: 0,
    data:[] ,
    resultData: 0,
    firstLoad: false
}

const messageReducer = (state: IMessageState = initialState, action:IMessageType ) : IMessageState =>{
    switch(action.type)
    {
        case ADD_USER:
        return {
            ...state,
            // users: [action.payload, ...state.users]
        };
        
        default:
            return state
    }
}

export default messageReducer