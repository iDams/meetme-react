/**
 * Created by idams on 6/19/15.
 */

'use strict'

import React from 'react';

import ApptStore from '../stores/ApptStore.js';
import ApptActions from '../actions/ApptActions.js';
import ApptConstants from '../constants/ApptConstants.js';

import ApptEdit from './ApptEdit.jsx';
import Utils from '../utils.js';

class Appt extends React.Component{

    constructor(props){
        super(props);

        this.state = {editMode:null};

        this._deleteAppt = this._deleteAppt.bind(this);
        this._onClick = this._onClick.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount(){
        ApptStore.addEventListener(ApptConstants.CHANGE_EVENT,this._onChange);
    }
    componentWillUnmount(){
        ApptStore.removeEventListener(ApptConstants.CHANGE_EVENT,this._onChange);
    }

    _deleteAppt(){
        ApptActions.destroy(this.props.appt.id);
    }
    _onChange(){
        this.setState({editMode:ApptStore.getEditMode()});
    }
    _onClick(){
        var id = this.state.editMode === this.props.appt.id ? null : this.props.appt.id;
        ApptActions.toggleEditMode(id);
    }
    _toString(){

        var str = this.props.appt.name;

        str += this.props.appt.time.length > 0 ? ' - '+Utils._timeToString(this.props.appt.time) : '';

        return str;

    }

    render(){
        var isEditing = this.state.editMode === this.props.appt.id;

        var editAppt =  isEditing ? <ApptEdit id={this.props.appt.id} /> : null;
        var apptClass = 'clear ';
        if( isEditing ) apptClass += 'disabled';

        return (
            <div key={this.props.appt.id} className="apptRow">
                <div className={apptClass}>
                    <span className="apptName left large-10" onClick={this._onClick}>{this._toString()}</span>
                    <a href="#" className="delete-btn right" onClick={this._deleteAppt}>Delete</a>
                </div>
                {editAppt}
            </div>
        )

    }

};
Appt.propTypes = {
    appt: React.PropTypes.object
};
Appt.defaultProps = {
    appt: {
        id: 0,
        name: 'No Name',
        time: ''
    }
};

export default Appt;