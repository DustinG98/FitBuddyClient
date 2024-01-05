import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { socket } from '../store'
import { CREATE_WORKOUT_PLAN_START, FETCH_USERS_WORKOUT_PLANS_START, FETCH_WORKOUT_PLAN_START } from '../types/workouts'
import { CreateWorkoutPlanInput } from '../../models/workouts'

export const CreateWorkoutPlan = (input: CreateWorkoutPlanInput): ThunkAction<void, any, unknown, Action<string>> => async (dispatch) => {
    dispatch({ type: CREATE_WORKOUT_PLAN_START })
    socket.send('create_workout_plan', input)
}

export const FetchWorkoutPlan = (workoutPlanId: string): ThunkAction<void, any, unknown, Action<string>> => async (dispatch) => {
    dispatch({ type: FETCH_WORKOUT_PLAN_START })
    socket.send('fetch_workout_plan', { workoutPlanId })
}

export const FetchUsersWorkoutPlans = (userId?: string): ThunkAction<void, any, unknown, Action<string>> => async (dispatch) => {
    dispatch({ type: FETCH_USERS_WORKOUT_PLANS_START })
    socket.send('fetch_users_workout_plans', { userId, abc: '123' })
}