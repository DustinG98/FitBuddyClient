import { WorkoutsState } from "../types/state";
import { CREATE_WORKOUT_PLAN_START, CREATE_WORKOUT_PLAN_SUCCESS, CREATE_WORKOUT_PLAN_ERROR } from "../types/workouts";


const initialState: WorkoutsState = {
    creationLoading: false,
    creationError: undefined,
    createdWorkoutPlan: undefined,
}

const workouts = (state: WorkoutsState = initialState, action: any) => {
    switch(action.type) {
        case CREATE_WORKOUT_PLAN_START: {
            return {
                ...state,
                creationLoading: true,
                creationError: undefined,
                createdWorkoutPlan: undefined,
            }
        }
        case CREATE_WORKOUT_PLAN_SUCCESS: {
            return {
                ...state,
                creationLoading: false,
                creationError: undefined,
                createdWorkoutPlan: action.payload.workoutPlan,
            }
        }
        case CREATE_WORKOUT_PLAN_ERROR: {
            return {
                ...state,
                creationLoading: false,
                creationError: action.payload,
                createdWorkoutPlan: undefined,
            }
        }
        default:{
            return state;
        }
    }
}

export default workouts