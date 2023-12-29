import { combineReducers } from "redux";
import posts from "./posts";
import users from './users'
import workouts from './workouts'

export default combineReducers({ postsState: posts, usersState: users, workoutsState: workouts })