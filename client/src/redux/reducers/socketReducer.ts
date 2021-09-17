import { SOCKET, ISocketType } from '../types/socketTypes'
// import { ISocket } from '../../utils/TypeScript'

const socketReducer = (state: any = null, action: ISocketType): any => {
  switch (action.type){
    case SOCKET:
      return action.payload
    default:
      return state
  }
}

export default socketReducer;