import * as ActionTypes from '../ActionTypes';

const initVal = {
    isLoading: false,
    medicines: [],
    error: ''
}

export const medicinesReducer = (state = initVal, action) => {
    console.log(action.type, action.payload, state);
    switch (action.type) {
        case ActionTypes.GET_MEDICINES:
            return {
                ...state,
                isLoading: false,
                medicines: action.payload,
                error: ''
            }
        case ActionTypes.ADD_MEDICINES:
            return {
                ...state,
                isLoading: false,
                medicines: state.medicines.concat(action.payload),
                error: ''
            }
        case ActionTypes.DELETE_MEDICINES:
            return {
                ...state,
                isLoading: false,
                medicines: state.medicines.filter((l) => l.id !== action.payload),
                error: ''
            }
        case ActionTypes.UPDATE_MEDICINES:
            return {
                ...state,
                isLoading: false,
                medicines: state.medicines.map((m) => {
                    if (m.id === action.payload.id) {
                        return action.payload
                    } else {
                        return m;
                    }
                }),
                error: ''
            }
        case ActionTypes.LOADING_MEDICINES:
            return {
                ...state,
                isLoading: true,
                error: ''
            }
        case ActionTypes.ERROR_MEDICINES:
            return {
                ...state,
                isLoading: false,
                medicines: [],
                error: action.payload
            }
        default:
            return state
    }
}