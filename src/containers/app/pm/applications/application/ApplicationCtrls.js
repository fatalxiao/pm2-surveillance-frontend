import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

import FlatButton from 'alcedo-ui/FlatButton';
import PageLoading from 'alcedo-ui/PageLoading';

import 'scss/containers/app/pm/applications/application/ApplicationCtrls.scss';

class ApplicationCtrls extends Component {

    constructor(props) {

        super(props);

        this.state = {
            uploadFieldKey: 1
        };

    }

    prepareUpload = () => {

        this.setState({
            uploadFieldKey: ++this.state.uploadFieldKey
        }, () => {

            const uploadFieldEl = this.refs.uploadField;

            if (!uploadFieldEl) {
                return;
            }

            uploadFieldEl.click();

        });

    };

    upload = e => {

        if (!e || !e.target || !e.target.files || !e.target.files[0]) {
            return;
        }

        const {data, uploadApplicationPackage} = this.props;
        data && uploadApplicationPackage && uploadApplicationPackage(data.name, e.target.files[0]);

    };

    startPause = () => {

        const {data, status, startApplication, stopApplication} = this.props;

        if (!data) {
            return;
        }

        if (status === 'online') {
            stopApplication && stopApplication(data.pm_id, data.name);
        } else {
            startApplication && startApplication(data.name);
        }

    };

    restart = () => {

        const {data, restartApplication} = this.props;

        if (!data) {
            return;
        }

        restartApplication && restartApplication(data.pm_id, data.name);

    };

    stop = () => {

        const {data, deleteApplication} = this.props;

        if (!data) {
            return;
        }

        deleteApplication && deleteApplication(data.pm_id, data.name);

    };

    render() {

        const {actionType, data, status} = this.props,
            {uploadFieldKey} = this.state,
            isLoading = data && actionType && data.name in actionType;

        return (
            <div className="application-ctrls">

                <input ref="uploadField"
                       key={uploadFieldKey}
                       className="upload-field"
                       name="file"
                       type="file"
                       accept="application/x-zip-compressed"
                       onChange={this.upload}/>

                <FlatButton className="application-ctrl"
                            iconCls="icon-upload-to-cloud"
                            tip="Upload"
                            disabled={isLoading}
                            onClick={this.prepareUpload}/>

                <FlatButton className="application-ctrl"
                            iconCls={`icon-controller-${status === 'online' ? 'paus' : 'play'}`}
                            tip={status === 'online' ? 'Pause' : (status === 'offline' ? 'Start' : 'Continue')}
                            disabled={!data.isReady || isLoading}
                            onClick={this.startPause}/>
                <FlatButton className="application-ctrl"
                            iconCls="icon-cw"
                            tip="Restart"
                            disabled={!data.isReady || isLoading}
                            onClick={this.restart}/>
                <FlatButton className="application-ctrl"
                            iconCls="icon-controller-stop"
                            tip="Stop"
                            disabled={!data.isReady || isLoading}
                            onClick={this.stop}/>

                <PageLoading className="application-loading"
                             visible={isLoading}
                             showStripes={false}/>

            </div>
        );
    }
}

ApplicationCtrls.propTypes = {

    actionType: PropTypes.object,
    data: PropTypes.object,
    status: PropTypes.string,

    uploadApplicationPackage: PropTypes.func,
    startApplication: PropTypes.func,
    stopApplication: PropTypes.func,
    restartApplication: PropTypes.func,
    deleteApplication: PropTypes.func

};

export default connect(state => ({
    actionType: state.application.actionType
}), dispatch => bindActionCreators({
    uploadApplicationPackage: actions.uploadApplicationPackage,
    startApplication: actions.startApplication,
    stopApplication: actions.stopApplication,
    restartApplication: actions.restartApplication,
    deleteApplication: actions.deleteApplication
}, dispatch))(ApplicationCtrls);