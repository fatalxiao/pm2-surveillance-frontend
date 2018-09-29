import * as actionTypes from 'reduxes/actionTypes';
import ProcessesApi from 'apis/app/ProcessesApi';

export const getProcesses = callback => dispatch => {
    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.GET_PROCESSES_REQUEST,
                actionTypes.GET_PROCESSES_SUCCESS,
                actionTypes.GET_PROCESSES_FAILURE
            ],
            api: ProcessesApi.getProcesses,
            isWebSocket: true,
            resMsgDisabled: true,
            successCallback(...args) {
                callback && callback(...args);
            }
        }
    });
};

let getProcessesIntervalId = null;
export const runGetProcessesInterval = (callback, interval = 5000) => dispatch => {

    if (getProcessesIntervalId) {
        clearTimeout(getProcessesIntervalId);
    }

    getProcesses((...args) => {
        callback && callback(...args);
    })(dispatch);

    getProcessesIntervalId = setTimeout(() => {
        runGetProcessesInterval(callback, interval)(dispatch);
    }, interval);

};
