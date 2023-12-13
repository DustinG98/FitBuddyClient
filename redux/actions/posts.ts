import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { socket } from '../store'
import { GET_POSTS_START, GET_POST_START } from '../types/posts'

export const FetchPosts = (userId: string): ThunkAction<void, any, unknown, Action<string>> => async (dispatch) => {
    dispatch({ type: GET_POSTS_START })
    console.log(userId)
    socket.send('get_posts_by_user_id', { userId })

}

export const FetchPost = (postId: string): ThunkAction<void, any, unknown, Action<string>> => async (dispatch) => {
    dispatch({ type: GET_POST_START })
    socket.send('get_post', { postId })
}