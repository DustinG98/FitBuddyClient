import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { socket } from '../store'
import { FOLLOW_USER_START, GET_FEED_START, GET_PROFILE_START, SEARCH_USERS_START, UNFOLLOW_USER_START } from '../types/users'

export const FetchProfile = (userId?: string): ThunkAction<void, any, unknown, Action<string>> => async (dispatch) => {
    dispatch({ type: GET_PROFILE_START })
    socket.send('get_profile', { userId, id: '123' })
}

export const FetchUserFeed = (userId?: string): ThunkAction<void, any, unknown, Action<string>> => async (dispatch) => {
    
    dispatch({type: GET_FEED_START})
    socket.send('get_user_feed', {})
}

export const SearchForUser = (userName: string): ThunkAction<void, any, unknown, Action<string>> => async (dispatch) => {
    dispatch({ type: SEARCH_USERS_START })
    socket.send('search_for_user', { userName })
}

export const FollowUser = (userId: string): ThunkAction<void, any, unknown, Action<string>> => async (dispatch) => {
    dispatch({ type: FOLLOW_USER_START })
    socket.send('follow_user', { userId })
}

export const UnfollowUser = (userId: string): ThunkAction<void, any, unknown, Action<string>> => async (dispatch) => {
    dispatch({ type: UNFOLLOW_USER_START })
    socket.send('unfollow_user', { userId })
}