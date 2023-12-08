import { UsersState } from "../types/state";
import { GET_PROFILE_ERROR, GET_PROFILE_START, GET_PROFILE_SUCCESS } from "../types/users";

const initialState = {
    loading: false,
    profile: undefined,
    error: null,
}

const posts = (state: UsersState = initialState, action: any) => {
    switch(action.type) {
        case GET_PROFILE_START: {
            return {
                ...state,
                loading: true,
            }
        }
        case GET_PROFILE_SUCCESS: {
            return {
                ...state,
                loading: false,
                profile: action.payload,
            }
        }
        case GET_PROFILE_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        }
        default:{
            return state;
        }
    }
}

export default posts