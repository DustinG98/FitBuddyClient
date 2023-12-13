import { GET_POSTS_ERROR, GET_POSTS_START, GET_POSTS_SUCCESS, GET_POST_ERROR, GET_POST_START, GET_POST_SUCCESS } from "../types/posts";
import { PostsState } from "../types/state";

const initialState = {
    loading: false,
    posts: {},
    othersPosts: [],
    error: null,
}

const posts = (state: PostsState = initialState, action: any) => {
    switch(action.type) {
        case GET_POSTS_START: {
            return {
                ...state,
                loading: true,
            }
        }
        case GET_POSTS_SUCCESS: {
            let userId = action.payload[0].id;
            if(action.userId === userId) userId = 'mine';
            return {
                ...state,
                loading: false,
                posts: { ...state.posts, [userId]: action.payload },
            }
        }
        case GET_POSTS_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        }
        case GET_POST_START: {
            return {
                ...state,
                loading: true,
            }
        }
        case GET_POST_SUCCESS: {
            return {
                ...state,
                loading: false,
                othersPosts: [...state.othersPosts, action.payload],
            }
        }
        case GET_POST_ERROR: {
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