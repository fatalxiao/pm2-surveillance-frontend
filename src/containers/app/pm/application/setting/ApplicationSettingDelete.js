import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions/index';

import RaisedButton from 'alcedo-ui/RaisedButton';

class ApplicationSettingDelete extends Component {

    constructor(props) {
        super(props);
    }

    del = () => {

        const {application, deleteApplication} = this.props;

        if (!application || !application.name || !deleteApplication) {
            return;
        }

        deleteApplication(application.name);

    };

    render() {

        const {application, actionType} = this.props,
            isLoading = application && actionType && application.name in actionType;

        if (!application) {
            return null;
        }

        return (
            <div className="application-setting-remove">

                <div className="title">Delete the Application</div>
                <div className="danger-block">

                    <div className="label">
                        Once you delete the application, there is no going back. Please be certain.
                    </div>

                    <div className="float-fix">
                        <RaisedButton className="rename-button"
                                      theme={RaisedButton.Theme.ERROR}
                                      value="Delete"
                                      isLoading={isLoading}
                                      onClick={this.del}/>
                    </div>

                </div>

            </div>
        );

    }
}

ApplicationSettingDelete.propTypes = {
    application: PropTypes.object,
    actionType: PropTypes.object,
    deleteApplication: PropTypes.func
};

export default connect(state => ({
    actionType: state.application.actionType
}), dispatch => bindActionCreators({
    deleteApplication: actions.deleteApplication
}, dispatch))(ApplicationSettingDelete);
