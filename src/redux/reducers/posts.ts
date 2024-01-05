import { CREATE_POST_ERROR, CREATE_POST_START, CREATE_POST_SUCCESS, GET_POSTS_ERROR, GET_POSTS_START, GET_POSTS_SUCCESS, GET_POST_ERROR, GET_POST_START, GET_POST_SUCCESS, GET_S3_SIGNED_URL_ERROR, GET_S3_SIGNED_URL_START, GET_S3_SIGNED_URL_SUCCESS, LIKE_POST_SUCCESS, UNLIKE_POST_SUCCESS } from "../types/posts";
import { PostsState } from "../types/state";

const initialState = {
    loading: false,
    posts: {},
    othersPosts: [],
    error: null,
    creationLoading: false,
    s3SignedUrl: undefined,
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
            let userId = action.payload[0]?.id;
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

        case GET_S3_SIGNED_URL_START: {
            return {
                ...state,
                creationLoading: true,
            }
        }

        case CREATE_POST_SUCCESS: {
            return {
                ...state,
                creationLoading: false,
                s3SignedUrl: undefined,
            }
        }

        case CREATE_POST_ERROR: {
            return {
                ...state,
                creationLoading: false,
                error: action.payload,
                s3SignedUrl: undefined,
            }
        }

        case GET_S3_SIGNED_URL_SUCCESS: {
            return {
                ...state,
                s3SignedUrl: action.payload,
            }
        }

        case GET_S3_SIGNED_URL_ERROR: {
            return {
                ...state,
                creationLoading: false,
                error: action.payload,
                s3SignedUrl: undefined,
            }
        }

        default:{
            return state;
        }
    }
}

export default posts