import { addMedicinesData, deleteMedicineData, getAllMedicinesData, updateMedicineData } from '../../common/apis/medicines.api';
import { BASE_URL } from '../../shared/baseUrl';
import * as ActionTypes from '../ActionTypes';

export const getMedicines = () => (dispatch) => {
    try {
        dispatch(loadingMedicines());

        setTimeout(function () {
            getAllMedicinesData()
                .then(data => dispatch({ type: ActionTypes.GET_MEDICINES, payload: data.data }))
                .catch((error) => dispatch(errorMedicines(error.message)))
            // fetch(BASE_URL + 'medicines')
            //     .then(response => {
            //         if (response.ok) {
            //             return response;
            //         } else {
            //             var error = new Error('Error ' + response.status + ': ' + response.statusText);
            //             error.response = response;
            //             throw error;
            //         }
            //     },
            //         error => {
            //             var errmess = new Error(error.message);
            //             throw errmess;
            //         })
            //     .then(response => response.json())
            //     .then(data => dispatch({ type: ActionTypes.GET_MEDICINES, payload: data }))
            //     .catch((error) => dispatch(errorMedicines(error.message)))
        }, 2000);
    } catch (error) {
        dispatch(errorMedicines(error.message));
    }
}

export const addMedicine = (data) => (dispatch) => {
    try {
        dispatch(loadingMedicines());

        setTimeout(function () {
            addMedicinesData(data)
                .then((data) => dispatch({ type: ActionTypes.ADD_MEDICINES, payload: data.data }))
                .catch((error) => dispatch(errorMedicines(error.message)))

            // fetch(BASE_URL + 'medicines', {
            //     method: 'POST', // or 'PUT'
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(data),
            // })
            //     .then(response => {
            //         if (response.ok) {
            //             return response;
            //         } else {
            //             var error = new Error('Error ' + response.status + ': ' + response.statusText);
            //             error.response = response;
            //             throw error;
            //         }
            //     },
            //         error => {
            //             var errmess = new Error(error.message);
            //             throw errmess;
            //         })
            //     .then(response => response.json())
            //     .then((data) => dispatch({ type: ActionTypes.ADD_MEDICINES, payload: data }))
            //     .catch((error) => dispatch(errorMedicines(error.message)))
        }, 2000);
    } catch (error) {
        dispatch(errorMedicines(error.message));
    }
}

export const deleteMedicines = (id) => (dispatch) => {
    try {
        deleteMedicineData(id)
            .then(dispatch({ type: ActionTypes.DELETE_MEDICINES, payload: id }))
            .catch((error) => dispatch(errorMedicines(error.message)))
        // fetch(BASE_URL + 'medicines/' + id, {
        //     method: 'DELETE'
        // })
        //     .then(response => {
        //         if (response.ok) {
        //             return response;
        //         } else {
        //             var error = new Error('Error ' + response.status + ': ' + response.statusText);
        //             error.response = response;
        //             throw error;
        //         }
        //     },
        //         error => {
        //             var errmess = new Error(error.message);
        //             throw errmess;
        //         })
        //     .then(dispatch({ type: ActionTypes.DELETE_MEDICINES, payload: id }))
        //     .catch((error) => dispatch(errorMedicines(error.message)))
    } catch (error) {
        dispatch(errorMedicines(error.message))
    }
}

export const updateMedicines = (data) => (dispatch) => {
    try {
        updateMedicineData(data)
            .then((data) => dispatch({ type: ActionTypes.UPDATE_MEDICINES, payload: data.data }))
            .catch((error) => dispatch(errorMedicines(error.message)))
        // fetch(BASE_URL + 'medicines/' + data.id, {
        //     method: 'PUT', // or 'PUT'
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        // })
        //     .then(response => {
        //         if (response.ok) {
        //             return response;
        //         } else {
        //             var error = new Error('Error ' + response.status + ': ' + response.statusText);
        //             error.response = response;
        //             throw error;
        //         }
        //     },
        //         error => {
        //             var errmess = new Error(error.message);
        //             throw errmess;
        //         })
        //     .then(response => response.json())
        //     .then((data) => dispatch({ type: ActionTypes.UPDATE_MEDICINES, payload: data }))
        //     .catch((error) => dispatch(errorMedicines(error.message)))

    } catch (error) {
        dispatch(errorMedicines(error.message));
    }
}

export const loadingMedicines = () => (dispatch) => {
    dispatch({ type: ActionTypes.LOADING_MEDICINES })
}

export const errorMedicines = (error) => (dispatch) => {
    dispatch({ type: ActionTypes.ERROR_MEDICINES, payload: error })
}