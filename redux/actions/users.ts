import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { socket } from '../store'
import { GET_PROFILE_START } from '../types/users'

export const FetchProfile = (userId?: string): ThunkAction<void, any, unknown, Action<string>> => async (dispatch) => {
    dispatch({ type: GET_PROFILE_START })
    socket.send('get_profile', { userId, id: '123' })
}