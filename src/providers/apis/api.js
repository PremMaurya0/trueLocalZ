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