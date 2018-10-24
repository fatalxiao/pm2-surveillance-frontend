import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

import TextField from 'components/FormTextField';
import Button from 'alcedo-ui/RaisedButton';

import 'scss/containers/app/pm/application/ApplicationSetting.scss';

class ApplicationSetting extends Component {

    constructor(props) {

        super(props);

        const application = this.getApplication();
        this.state = {
            name: application ? application.name : ''
        };

    }

    getApplication = () => {
        const {match, applications} = this.props;
        return applications && applications.find(item => item && item.name === match.params.name);
    };

    updateField = name => {
        this.setState({
            name
        });
    };

    render() {

        const {name} = this.state,
            application = this.getApplication();

        if (!application) {
            return null;
        }

        return (
            <div className="application-setting">

                <TextField label="Application Name"
                           isLabelAnimate={false}
                           placeholder="new-application"
                           clearButtonVisible={false}
                           value={name}
                           isErrorPlaceholder={false}
                           onChange={this.updateField}/>

                <div className="label">
                    Rename action will affect <span>Application Root Directory Name</span>.
                    If you use other continuous integration tools (like jenkins),
                    you should make sure your new config is right.
                    Wrong Directory Name will be ignored.
                </div>

                <Button className="rename-button"
                        theme={Button.Theme.WARNING}
                        value="Rename"
                        onClick={this.update}/>

            </div>
        );

    }
}

ApplicationSetting.propTypes = {
    applications: PropTypes.array,
    restartApplication: PropTypes.func
};

export default connect(state => ({
    applications: state.applications.data
}), dispatch => bindActionCreators({
    restartApplication: actions.restartApplication
}, dispatch))(ApplicationSetting);
