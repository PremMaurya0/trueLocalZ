import axios from 'axios';
import * as GlobalProvider from '../globals/globals';

axios.defaults.baseURL = 'http://localhost:3001/api/v1';
// axios.defaults.baseURL = 'http://172.104.41.239:3001';
//axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function readError(error) {
    // console.log('error:::', error)

    let message;
    let errorMsg = error;

    if (typeof errorMsg === 'undefined') {
        message = "Something went wrong, Please try again.";
    }
    else if (typeof errorMsg === 'object') {

        if (typeof errorMsg.message !== 'undefined') {
            message = errorMsg.message;
        }
        else if (typeof errorMsg.error !== 'undefined') {
            message = errorMsg.error;
        }
        else {
            message = "Something went wrong, please try again.";
        }
    }
    else {
        message = errorMsg;
    }

    return message;
}

function readResponse(response) {
    // console.log('response::::', response.data);
    return response.data;
}

// Login 
export const login = (params) => {
    return axios.post(`/login`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
// Add New Area
export const addArea = (params) => {
    return axios.post(`/addArea`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

// Area List
export const areaList = async() => {
    return  await axios.get(`/areaList`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
// Add New bike
export const addBike = (params) => {
    return axios.post(`/addVechile`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
// Vehicle List
export const VList = async() => {
    return  await axios.get(`/vechileList`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
// Single area
export const SingleArea = async(params) => {
    return  await axios.post(`/areaSingle`,params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
// Assign/Re-Assign Vehicle
export const updateVechile = async(params) => {
    return  await axios.post(`/updateVechile`,params,{
        headers: {
            'Content-Type': 'application/json',
        } }).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
//  Vehicle view
export const viewVechile = async(params) => {
    return  await axios.post(`/vechileSingle`,params,{
        headers: {
            'Content-Type': 'application/json',
        } }).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
//  Vehicle Edit
export const editVechile = async(params) => {
    return  await axios.post(`/vechileEdit`,params,{
        headers: {
            'Content-Type': 'application/json',
        } }).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
//  Vehicle Delete
export const deleteVechile = async(params) => {
    return  await axios.post(`/vechileDelete`,params,{
        headers: {
            'Content-Type': 'application/json',
        } }).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const areaSingle = async(params) => {
    return  await axios.post(`/areaSingle`,params,{
        headers: {
            'Content-Type': 'application/json',
        } }).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

// Add New driver
export const addDriver = async(params) => {
    return await axios.post(`/addDriver`, params,{headers: {
        'Content-Type': 'application/json',
    }}).then(response => readResponse(response)).catch(error => { throw readError(error); });
}