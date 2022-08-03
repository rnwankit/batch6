import axios from 'axios'
import { BASE_URL } from '../shared/baseUrl';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 2000
});

const sendRequest = (config) => {
    return axiosInstance.request(config)
}

export const getRequest = (path) => {
    return sendRequest({
        url: path,
        method: 'GET'
    })
}

export const postRequest = (path, data) => {
    return sendRequest({
        url: path,
        method: 'POST',
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export const deleteRequest = (path, id) => {
    return sendRequest({
        url: path + id,
        method: 'DELETE'
    })
}

export const updateRequest = (path, data) => {
    return sendRequest({
        url: path + data.id,
        method: 'PUT',
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    })
}