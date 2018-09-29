import Api from '../Api';
import WebSocketApi from '../WebSocketApi';
import config from '../../config';

export default {

    uploadProcessPackage(options) {

        const reader = new FileReader();
        reader.readAsArrayBuffer(options.params.file);
        reader.onload = e => {
            WebSocketApi.request({
                ...options,
                url: `ws://localhost:9616/pm/process/upload/${options.params.processName}`,
                message: e.target.result,
                autoClose: true
            });
        };

        // Api.postForm({
        //     ...options,
        //     url: `${config.appBaseUrl}/process/upload/${options.params.processName}`,
        //     formData: options.params.formData,
        //     cancelable: false
        // });

    },

    startProcess(options) {
        Api.put({
            ...options,
            name,
            url: `${config.reportBaseUrl}/pm/process/start/${options.params.processName}`
        });
    },

    pauseProcess(options) {
        Api.put({
            ...options,
            name,
            url: `${config.reportBaseUrl}/pm/process/stop/${options.params.processId}`
        });
    },

    restartProcess(options) {
        Api.put({
            ...options,
            name,
            url: `${config.reportBaseUrl}/pm/process/restart/${options.params.processId}`
        });
    },

    stopProcess(options) {
        Api.put({
            ...options,
            name,
            url: `${config.reportBaseUrl}/pm/process/delete/${options.params.processId}`
        });
    },

    reloadProcess(options) {
        Api.put({
            ...options,
            name,
            url: `${config.reportBaseUrl}/pm/process/reload/${options.params.processId}`
        });
    }

};
