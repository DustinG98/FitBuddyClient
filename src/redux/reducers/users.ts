import { router } from "expo-router";
import { UsersState } from "../types/state";
import { CLEAR_NOTIFICATION, FOLLOW_USER_ERROR, FOLLOW_USER_START, FOLLOW_USER_SUCCESS, GET_FEED_ERROR, GET_FEED_START, GET_FEED_SUCCESS, GET_MY_PROFILE_SUCCESS, GET_PROFILE_ERROR, GET_PROFILE_START, GET_PROFILE_SUCCESS, SEARCH_USERS_ERROR, SEARCH_USERS_START, SEARCH_USERS_SUCCESS, SHOW_NOTIFICATION, UNFOLLOW_USER_ERROR, UNFOLLOW_USER_SUCCESS } from "../types/users";
import { ActionTypes } from "../types/websocket";
import { CREATE_WORKOUT_PLAN_SUCCESS, FETCH_USERS_WORKOUT_PLANS_SUCCESS } from "../types/workouts";

const initialState: UsersState = {
    profileLoading: false,
    feedLoading: false,
    searchLoading: false,
    profile: undefined,
    connected: false,
    profiles: [],
    feed: undefined,
    searchResults: [],
    error: null,
    notification: undefined,
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
            const newPosts = action.payload?.posts.filter((post: any) => !state.feed?.find((p: any) => p.postId === post.postId)) || [];
            return {
                ...state,
                feedLoading: false,
                feed: [...state.feed || [], ...newPosts],
            }
        }
        case GET_FEED_ERROR: {
            return {
                ...state,
                feedLoading: false,
                error: action.payload,
            }
        }
        case SEARCH_USERS_START: {
            return {
                ...state,
                searchLoading: true,
            }
        }
        case SEARCH_USERS_SUCCESS: {
            const filteredResults = action.payload.filter((user: any) => user.userId !== action.userId);
            return {
                ...state,
                searchLoading: false,
                searchResults: filteredResults,
            }
        }
        case SEARCH_USERS_ERROR: {
            return {
                ...state,
                searchLoading: false,
                error: action.payload,
            }
        }
        case FOLLOW_USER_SUCCESS: {
            const newProfiles = [...state.profiles].map((profile: any) => {
                if(profile.userId === action.payload.userId) {
                    return {...profile, isFollowing: true, followers: profile.followers + 1};
                }
                return profile;
            })
            if(state.profile) {
                const newProfile = {...state.profile, following: state.profile.following + 1};
                return {
                    ...state,
                    profile: newProfile,
                    profiles: newProfiles,
                }
            }
            return {
                ...state,
                profiles: newProfiles,
            }
        }
        case FOLLOW_USER_ERROR: {
            return {
                ...state,
                error: action.payload,
            }
        }
        case UNFOLLOW_USER_SUCCESS: {
            const newProfiles = [...state.profiles].map((profile: any) => {
                if(profile.userId === action.payload.userId) {
                   return {...profile, isFollowing: false, followers: profile.followers - 1};
                }
                return profile;
            })
            if(state.profile) {
                const newProfile = {...state.profile, following: state.profile.following - 1};
                return {
                    ...state,
                    profile: newProfile,
                    profiles: newProfiles,
                }
            }
            const notification = {
                type: 'success',
                message: 'Unfollowed user',
            }
            return {
                ...state,
                notification,
                profiles: newProfiles,
            }
        }
        case UNFOLLOW_USER_ERROR: {
            return {
                ...state,
                error: action.payload,
            }
        }
        case SHOW_NOTIFICATION: {
            return {
                ...state,
                notification: action.payload,
            }
        }
        case CLEAR_NOTIFICATION: {
            return {
                ...state,
                notification: undefined,
            }
        }
        case CREATE_WORKOUT_PLAN_SUCCESS: {
            const notification = {
                type: 'success',
                message: 'Successfully created workout plan',
                actionName: 'View',
                action: "route#" + action.payload.workoutPlanId,
            }
            return {
                ...state,
                notification,
            }
        }
        default:{
            return state;
        }
    }
}

export default posts