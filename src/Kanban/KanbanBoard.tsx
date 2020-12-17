import * as React from 'react';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import './kanban.css';

export default class KanbanBoard extends React.Component {
    props:any;
    fields:any;
    constructor(props:any) {
        super(props);
    }

    render() {
        return (<div className='schedule-control-section'>
        <div className='col-lg-12 control-section'>
          <div className='control-wrapper'>
            <KanbanComponent id="kanban" 
            cssClass="kanban-overview" 
            keyField="State"
            dataSource={this.props.tasks}
            cardSettings={{ showHeader:false, headerField: "id", contentField: "TaskName"}} >
              <ColumnsDirective>
                <ColumnDirective headerText="To Do" keyField="ToDo"/>
                <ColumnDirective headerText="In Progress" keyField="InProgress"/>
                <ColumnDirective headerText="In Review" keyField="Review"/>
                <ColumnDirective headerText="Done" keyField="Done"/>
              </ColumnsDirective>
            </KanbanComponent>
          </div>
        </div>
      </div>);
    }
}