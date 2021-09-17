import * as types from '../../redux/types/blogType'

var initialState = ''

var searchReducer = (state = initialState, action: any) =>{
    switch (action.type){
        
        case types.SEARCH_BLOG:
            // console.log(state)
            // console.log(action)
            return action.keyword;

        default:  return state;
    }
}

export default searchReducer;