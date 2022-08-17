import * as ActionTypes from '../ActionTypes';

export const getDoctors = () => (dispatch) => {
    try {
       // dispatch(loadingDoctors());

       
    } catch (error) {
        dispatch(errorDoctors(error.message));
    }
}

export const addDoctor = (data) => (dispatch) => {
    try {
        dispatch(loadingDoctors());

        
    } catch (error) {
        dispatch(errorDoctors(error.message));
    }
}

export const deleteDoctors = (id) => (dispatch) => {
    try {
        
    } catch (error) {
        dispatch(errorDoctors(error.message))
    }
}

export const updateDoctors = (data) => (dispatch) => {
    try {
        
    } catch (error) {
        dispatch(errorDoctors(error.message));
    }
}

export const loadingDoctors = () => (dispatch) => {
    dispatch({ type: ActionTypes.LOADING_DOCTORS })
}

export const errorDoctors = (error) => (dispatch) => {
    dispatch({ type: ActionTypes.ERROR_DOCTORS, payload: error })
}