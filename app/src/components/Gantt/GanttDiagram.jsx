import { 
    Inject, 
    Selection, 
    Edit,
    GanttComponent
} from '@syncfusion/ej2-react-gantt';

import * as React from 'react';
import './gantt.css';

class GanttDiagram extends React.Component {
    constructor(props) {
        super(props);
        this.taskFields = {
            id: 'id',
            name: 'name',
            startDate: 'start_date',
            endDate: 'end_date',
            duration: 'duration',
            progress: 'progress',
            parentID: 'parent_id',
            dependency: 'predecessor',
            project_id: 'project_id'
        };
        
        this.labelSettings = {
            rightLabel: 'assignee'
        };
        this.resourceFields = {
            id: 'userId',
            name: 'fullName',
        };
        this.editSettings = {
            allowTaskbarEditing: true,
            allowEditing: true,
            allowDeleting: true,
            mode: 'Auto'
        };
        this.lastTasksCount = props.tasks.length;
    }
    
componentDidUpdate(props) {
    if(props.tasks !== undefined && props.tasks.length != this.lastTasksCount) {
        this.lastTasksCount = props.tasks.length; // Fix for Gantt doesn't resresh on adding new task.
        this.ganttInstance.refresh();
    }
}

endEdit(event) {
    if(event.action === "CellEditing") {
        this.props.editCallback({data:[event.data.taskData], action: "save"});
    }
    if(event.action === "Delete") {
        this.props.deleteCallback({data:[event.data.taskData], action: "delete"});
    }
    if(event.action === "delete") {
        this.props.deleteCallback({data:[event.data[0].taskData], action: "delete"});
    }
}

    render() {
        return (<GanttComponent
            ref={gantt => this.ganttInstance = gantt}
            endEdit={this.endEdit.bind(this)}
            actionComplete={this.endEdit.bind(this)}
            dataSource={this.props.tasks}
            taskFields={this.taskFields} 
            editSettings={this.editSettings}
            resourceFields={this.resourceFields}
            resources={this.props.users}
            allowSelection={true}
            rowHeight={40}
            taskbarHeight={20}>
            <Inject services={[Edit, Selection]}/>
            </GanttComponent>);
    }
}

export default GanttDiagram;