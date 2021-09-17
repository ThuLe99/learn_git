import {
    GET_TOP_BLOG,
    IGetTopBlogsType,
    
  } from '../types/blogType'
  import { IBlog } from '../../utils/TypeScript'
  
  const topBlogsReducer = (
    state: IBlog[] = [],
    action: IGetTopBlogsType
  ): IBlog[] => {
    switch (action.type){
      case GET_TOP_BLOG:
        return action.payload
  
      default:
        return state
    }
  }
  
  
  export default topBlogsReducer