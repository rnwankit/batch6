import { deleteRequest, getRequest, postRequest, updateRequest } from "../request"


export const getAllMedicinesData = () => {
    return getRequest('medicines')
}

export const addMedicinesData = (data) => {
    return postRequest('medicines', data)
}

export const deleteMedicineData = (id) => {
    return deleteRequest("medicines/", id);
}

export const updateMedicineData = (data) => {
    return updateRequest("medicines/", data)
}