import {
    ILikeState,
    IGetLikeType,
    GET_LIKE
  } from "../types/blogType";
  
  const initialState = {
    data: [],
    total: 0,
  };
  
  const likeReducer = (
    state: ILikeState = initialState,
    action: IGetLikeType
  ): ILikeState => {
    switch (action.type) {
      
      case GET_LIKE:
        return action.payload;
      
      default:
        return state;
    }
  };
  
  export default likeReducer;
  