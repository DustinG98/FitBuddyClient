import { CREATE_POST_ERROR, CREATE_POST_SUCCESS, GET_POSTS_ERROR, GET_POSTS_SUCCESS, GET_POST_ERROR, GET_POST_SUCCESS, LIKE_POST_ERROR, LIKE_POST_SUCCESS, UNLIKE_POST_ERROR, UNLIKE_POST_SUCCESS } from "./posts";
import { FOLLOW_USER_ERROR, FOLLOW_USER_SUCCESS, GET_FEED_ERROR, GET_FEED_SUCCESS, GET_PROFILE_ERROR, GET_PROFILE_SUCCESS, SEARCH_USERS_ERROR, SEARCH_USERS_SUCCESS, UNFOLLOW_USER_ERROR, UNFOLLOW_USER_START, UNFOLLOW_USER_SUCCESS } from "./users";
import { CREATE_WORKOUT_PLAN_ERROR, CREATE_WORKOUT_PLAN_SUCCESS } from "./workouts";

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

    'like_post_success' = LIKE_POST_SUCCESS,
    'like_post_error' = LIKE_POST_ERROR,

    'unlike_post_success' = UNLIKE_POST_SUCCESS,
    'unlike_post_error' = UNLIKE_POST_ERROR,

    'follow_user_success' = FOLLOW_USER_SUCCESS,
    'follow_user_error' = FOLLOW_USER_ERROR,

    'unfollow_user_success' = UNFOLLOW_USER_SUCCESS,
    'unfollow_user_error' = UNFOLLOW_USER_ERROR,

    'workout_plan_complete' = CREATE_WORKOUT_PLAN_SUCCESS,
    'workout_plan_error' = CREATE_WORKOUT_PLAN_ERROR,
}