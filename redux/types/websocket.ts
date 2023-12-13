import { CREATE_POST_ERROR, CREATE_POST_SUCCESS, GET_POSTS_ERROR, GET_POSTS_SUCCESS, GET_POST_ERROR, GET_POST_SUCCESS } from "./posts";
import { GET_FEED_ERROR, GET_FEED_SUCCESS, GET_PROFILE_ERROR, GET_PROFILE_SUCCESS, SEARCH_USERS_ERROR, SEARCH_USERS_SUCCESS } from "./users";

export enum ActionTypes {
    CONNECTED = 'CONNECTED',
    DISCONNECTED = 'DISCONNECTED',
    'post_create_update_success' = CREATE_POST_SUCCESS,
    'post_create_update_error' = CREATE_POST_ERROR,

    'get_user_feed_success' = GET_FEED_SUCCESS,
    'get_user_feed_error' = GET_FEED_ERROR,

    'get_profile_success' = GET_PROFILE_SUCCESS,
    'get_profile_error' = GET_PROFILE_ERROR,

    'get_posts_by_id_success' = GET_POSTS_SUCCESS,
    'get_posts_by_id_error' = GET_POSTS_ERROR,

    'get_post_success' = GET_POST_SUCCESS,
    'get_post_error' = GET_POST_ERROR,

    'search_for_user_success' = SEARCH_USERS_SUCCESS,
    'search_for_user_error' = SEARCH_USERS_ERROR,
}