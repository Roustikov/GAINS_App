import { DataBinding } from "@syncfusion/ej2-react-diagrams";

import { 
    Inject, 
    Selection, 
    Edit,
    EditSettingsModel,
    GanttComponent,
    TaskFieldsModel
} from '@syncfusion/ej2-react-gantt';

import * as React from 'react';
import './gantt.css';

class GanttDiagram extends React.Component {
    taskFields: TaskFieldsModel;
    editSettings: EditSettingsModel;
    labelSettings: { rightLabel: string; };
    resourceFields: { id: string; name: string; };
    props: any;
    state: any;
    constructor(props: {tasks: any; users: any;}) {
        super(props);
        this.state = {
            tasks: props.tasks,
            users: props.users
        };

        this.taskFields = {
            id: 'id',
            name: 'TaskName',
            startDate: 'StartDate',
            duration: 'Duration',
            progress: 'Progress',
            child: 'subtasks',
            dependency: 'Predecessor',
            resourceInfo: 'resources'
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
            mode: 'Auto',
        };
    }

    render() {
        return (<GanttComponent
            dataSource={this.state.tasks}
            taskFields={this.taskFields} 
            editSettings={this.editSettings}
            resourceFields={this.resourceFields}
            resources={this.state.users}
            allowSelection={true}
            rowHeight={40}
            taskbarHeight={20}>
            <Inject services={[Edit, Selection]}/>
            </GanttComponent>);
    }
}

export default GanttDiagram;