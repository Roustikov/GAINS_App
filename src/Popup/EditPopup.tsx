import Popup from 'reactjs-popup';
import './modal.css';

import React, { Component } from 'react'
import TaskForm from '../TaskForm.js'

export default class EditPopup extends Component {
    state: any;
    props: any;
    render() {
        return (
            <Popup
            trigger={<button className="button add-task"> Add Task </button>}
            modal={true}
            nested={true}>
            {(close:any) => (
              <div className="modal">
                <button className="close" onClick={close}>
                  &times;
                </button>
                <div className="header"> Add Task </div>
                <div className="content">
                <TaskForm 
                addTaskCallback={this.props.addTaskCallback} 
                dataProvider={this.props.dataProvider}
                close={close}>
                </TaskForm>
                </div>
              </div>
            )}
            </Popup>
        )
    }
}