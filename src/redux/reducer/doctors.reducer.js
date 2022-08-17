import * as ActionTypes from '../ActionTypes';

const initVal = {
    isLoading: false,
    doctors: [],
    error: ''
}

export const doctorsReducer = (state = initVal, action) => {
    console.log(action.type, action.payload, state);
    switch (action.type) {
        case ActionTypes.GET_DOCTORS:
            return {
                ...state,
                isLoading: false,
                doctors: action.payload,
                error: ''
            }
        case ActionTypes.ADD_DOCTORS:
            return {
                ...state,
                isLoading: false,
                doctors: state.doctors.concat(action.payload),
                error: ''
            }
        case ActionTypes.DELETE_DOCTORS:
            return {
                ...state,
                isLoading: false,
                doctors: state.doctors.filter((l) => l.id !== action.payload),
                error: ''
            }
        case ActionTypes.UPDATE_DOCTORS:
            return {
                ...state,
                isLoading: false,
                doctors: state.doctors.map((m) => {
                    if (m.id === action.payload.id) {
                        return action.payload
                    } else {
                        return m;
                    }
                }),
                error: ''
            }
        case ActionTypes.LOADING_DOCTORS:
            return {
                ...state,
                isLoading: true,
                error: ''
            }
        case ActionTypes.ERROR_DOCTORS:
            return {
                ...state,
                isLoading: false,
                doctors: [],
                error: action.payload
            }
        default:
            return state
    }
}