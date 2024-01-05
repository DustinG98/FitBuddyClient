import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { socket } from '../store'
import { CREATE_POST_START, GET_POSTS_START, GET_POST_START, GET_S3_SIGNED_URL_START, LIKE_POST_START, UNLIKE_POST_START } from '../types/posts'

export const FetchPosts = (userId?: string): ThunkAction<void, any, unknown, Action<string>> => async (dispatch) => {
    dispatch({ type: GET_POSTS_START })
    socket.send('get_posts_by_user_id', { userId, id: '123' })
}

export const FetchPost = (postId: string): ThunkAction<void, any, unknown, Action<string>> => async (dispatch) => {
    dispatch({ type: GET_POST_START })
    socket.send('get_post', { postId })
}

export const LikePost = (postId: string): ThunkAction<void, any, unknown, Action<string>> => async (dispatch) => {
    dispatch({ type: LIKE_POST_START })
    socket.send('like_post', { postId })
}

export const UnlikePost = (postId: string): ThunkAction<void, any, unknown, Action<string>> => async (dispatch) => {
    dispatch({ type: UNLIKE_POST_START })
    socket.send('unlike_post', { postId })
}

export const GetS3SignedUrl = (imageType: string): ThunkAction<void, any, unknown, Action<string>> => async (dispatch) => {
    dispatch({ type: GET_S3_SIGNED_URL_START })
    socket.send('get_s3_url', { imageType })
}

export const CreatePost = (content: string, image: string): ThunkAction<void, any, unknown, Action<string>> => async (dispatch) => {
    dispatch({ type: CREATE_POST_START })
    socket.send('create_update_post', { content, image })
}