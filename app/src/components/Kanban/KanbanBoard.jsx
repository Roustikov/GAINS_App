import * as React from 'react';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import './kanban.css';

export default class KanbanBoard extends React.Component {
    constructor(props) {
        super(props);
        this.fields = [
            { key: 'name', type: 'TextArea' },
            { key: 'state', type: 'DropDown' },
            { key: 'progress', type: 'Numeric' },
        ];
        this.lastTasksCount = props.tasks.length;
    }

    componentDidUpdate(props) {
        if(props.tasks !== undefined && props.tasks.length != this.lastTasksCount) {
            this.lastTasksCount = props.tasks.length; // Fix for Kanban doesn't resresh on adding new task.
            this.kanbanInstance.refresh();
        }
    }

    actionComplete(event) {
        if (event.name === "actionComplete") {
            if(event.requestType === "cardChanged"){
                this.props.editCallback({data: event.changedRecords, action: "save"});
            } 
            if (event.requestType === "cardRemoved") {
                this.props.deleteCallback({data: event.deletedRecords, action: "delete"});
            }
        }
    }

    render() {
        return (
            <div className='schedule-control-section'>
                <div className='col-lg-12 control-section'>
                    <div className='control-wrapper'>
                        <KanbanComponent id="kanban"
                            ref={kanban => this.kanbanInstance = kanban}
                            cssClass="kanban-overview"
                            keyField="state"
                            dataSource={this.props.tasks}
                            dialogSettings={{ fields: this.fields }}
                            actionComplete={this.actionComplete.bind(this)}
                            cardSettings={{
                                showHeader: false,
                                headerField: "id",
                                contentField: "name"
                            }} >
                            <ColumnsDirective>
                                <ColumnDirective headerText="To Do" keyField="ToDo" />
                                <ColumnDirective headerText="In Progress" keyField="InProgress" />
                                <ColumnDirective headerText="In Review" keyField="Review" />
                                <ColumnDirective headerText="Done" keyField="Done" />
                            </ColumnsDirective>
                        </KanbanComponent>
                    </div>
                </div>
            </div>);
    }
}
