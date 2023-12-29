import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { socket } from '../store'
import { CREATE_WORKOUT_PLAN_START } from '../types/workouts'
import { CreateWorkoutPlanInput } from '../../models/workouts'

export const CreateWorkoutPlan = (input: CreateWorkoutPlanInput): ThunkAction<void, any, unknown, Action<string>> => async (dispatch) => {
    dispatch({ type: CREATE_WORKOUT_PLAN_START })
    socket.send('create_workout_plan', input)
}