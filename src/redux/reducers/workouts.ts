import { WorkoutsState } from "../types/state";
import { CREATE_WORKOUT_PLAN_START, CREATE_WORKOUT_PLAN_SUCCESS, CREATE_WORKOUT_PLAN_ERROR, FETCH_WORKOUT_PLAN_START, FETCH_WORKOUT_PLAN_SUCCESS, FETCH_WORKOUT_PLAN_ERROR, FETCH_USERS_WORKOUT_PLANS_START, FETCH_USERS_WORKOUT_PLANS_SUCCESS, FETCH_USERS_WORKOUT_PLANS_ERROR } from "../types/workouts";


const initialState: WorkoutsState = {
    creationLoading: false,
    creationError: undefined,
    createdWorkoutPlanId: undefined,
    fetchLoading: false,
    fetchError: undefined,
    fetchedWorkoutPlan: undefined,
    usersWorkoutPlans: undefined,
    usersWorkoutPlansError: undefined,
    usersWorkoutPlansLoading: false,
}

const workouts = (state: WorkoutsState = initialState, action: any) => {
    switch(action.type) {
        case CREATE_WORKOUT_PLAN_START: {
            return {
                ...state,
                creationLoading: true,
                creationError: undefined,
                createdWorkoutPlanId: undefined,
            }
        }
        case CREATE_WORKOUT_PLAN_SUCCESS: {
            return {
                ...state,
                creationLoading: false,
                creationError: undefined,
                createdWorkoutPlanId: action.payload.workoutPlanId,
                usersWorkoutPlans: undefined, // force refetch
            }
        }
        case CREATE_WORKOUT_PLAN_ERROR: {
            return {
                ...state,
                creationLoading: false,
                creationError: action.payload,
                createdWorkoutPlanId: undefined,
            }
        }
        case FETCH_WORKOUT_PLAN_START: {
            return {
                ...state,
                fetchLoading: true,
                fetchError: undefined,
                fetchedWorkoutPlan: undefined,
            }
        }
        case FETCH_WORKOUT_PLAN_SUCCESS: {
            return {
                ...state,
                fetchLoading: false,
                fetchError: undefined,
                fetchedWorkoutPlan: action.payload.workoutPlan,
            }
        }
        case FETCH_WORKOUT_PLAN_ERROR: {
            return {
                ...state,
                fetchLoading: false,
                fetchError: action.payload,
                fetchedWorkoutPlan: undefined,
            }
        }
        case FETCH_USERS_WORKOUT_PLANS_START: {
            return {
                ...state,
                usersWorkoutPlansLoading: true,
                usersWorkoutPlansError: undefined,
                usersWorkoutPlans: undefined,
            }
        }
        case FETCH_USERS_WORKOUT_PLANS_SUCCESS: {
            return {
                ...state,
                usersWorkoutPlansLoading: false,
                usersWorkoutPlansError: undefined,
                usersWorkoutPlans: action.payload.workoutPlans,
            }
        }
        case FETCH_USERS_WORKOUT_PLANS_ERROR: {
            return {
                ...state,
                usersWorkoutPlansLoading: false,
                usersWorkoutPlansError: action.payload,
                usersWorkoutPlans: undefined,
            }
        }
        default:{
            return state;
        }
    }
}

export default workouts