import { GET_POSTS_ERROR, GET_POSTS_START, GET_POSTS_SUCCESS } from "../types/posts";

const posts = (state: any = {}, action: any) => {
    switch(action.type) {
        case GET_POSTS_START: {
            return {
                ...state,
                loading: true,
            }
        }
        case GET_POSTS_SUCCESS: {
            return {
                ...state,
                loading: false,
                posts: action.payload,
            }
        }
        case GET_POSTS_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        }
        default:{
            return state;
        }
    }
}

export default posts