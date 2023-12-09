import { UsersState } from "../types/state";
import { GET_FEED_ERROR, GET_FEED_START, GET_FEED_SUCCESS, GET_PROFILE_ERROR, GET_PROFILE_START, GET_PROFILE_SUCCESS } from "../types/users";

const initialState = {
    loading: false,
    profile: undefined,
    feed: [],
    error: null,
}

const posts = (state: UsersState = initialState, action: any) => {
    console.log(action)
    switch(action.type) {
        case GET_PROFILE_START: {
            return {
                ...state,
                loading: true,
            }
        }
        case GET_PROFILE_SUCCESS: {
            return {
                ...state,
                loading: false,
                profile: action.payload,
            }
        }
        case GET_PROFILE_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        }
        case GET_FEED_START: {
            return {
                ...state,
                loading: true,
            }
        }
        case GET_FEED_SUCCESS: {
            return {
                ...state,
                loading: false,
                feed: [...state.feed, ...action.payload.posts],
            }
        }
        case GET_FEED_ERROR: {
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