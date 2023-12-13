import { UsersState } from "../types/state";
import { GET_FEED_ERROR, GET_FEED_START, GET_FEED_SUCCESS, GET_MY_PROFILE_SUCCESS, GET_PROFILE_ERROR, GET_PROFILE_START, GET_PROFILE_SUCCESS } from "../types/users";
import { ActionTypes } from "../types/websocket";

const initialState: UsersState = {
    profileLoading: false,
    feedLoading: false,
    profile: undefined,
    connected: false,
    profiles: [],
    feed: [],
    error: null,
}

const posts = (state: UsersState = initialState, action: any) => {
    switch(action.type) {
        case ActionTypes.CONNECTED: {
            return {
                ...state,
                connected: true,
            }
        }
        case ActionTypes.DISCONNECTED: {
            return {
                ...state,
                connected: false,
            }
        }
        case GET_PROFILE_START: {
            return {
                ...state,
                profileLoading: true,
            }
        }
        case GET_PROFILE_SUCCESS: {
            console.log('GET_PROFILE_SUCCESS', action.payload)
            if(action.payload.userId === action.userId) { 
                return {
                    ...state,
                    profileLoading: false,
                    profile: action.payload,
                }
            } else {
                return {
                    ...state,
                    profileLoading: false,
                    profiles: [...state.profiles, action.payload],
                }
            }

        }
        case GET_PROFILE_ERROR: {
            return {
                ...state,
                profileLoading: false,
                error: action.payload,
            }
        }
        case GET_FEED_START: {
            return {
                ...state,
                feedLoading: true,
            }
        }
        case GET_FEED_SUCCESS: {
            return {
                ...state,
                feedLoading: false,
                feed: [...state.feed, ...action.payload.posts],
            }
        }
        case GET_FEED_ERROR: {
            return {
                ...state,
                feedLoading: false,
                error: action.payload,
            }
        }
        default:{
            return state;
        }
    }
}

export default posts