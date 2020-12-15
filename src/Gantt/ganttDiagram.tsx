import {
    DataManager
} from '@syncfusion/ej2-data';

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
    ganttInstance: any;
    dataSource: DataManager;

    constructor(props: {tasks: any; users: any;}) {
        super(props);
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
            mode: 'Auto'
        };
        this.dataSource = new DataManager(props.tasks);
    }
    
componentDidUpdate(props:any) {
    let gantt:GanttComponent = this.ganttInstance;
    gantt.refresh();
}

    render() {
        return (<GanttComponent
            ref={gantt => this.ganttInstance = gantt}
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