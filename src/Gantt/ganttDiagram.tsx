import { TaskFieldsModel } from '@syncfusion/ej2-react-gantt';
import { 
    Inject, 
    Selection, 
    Edit,
    EditSettingsModel,
    GanttComponent  
} from '@syncfusion/ej2-react-gantt';
import * as React from 'react';
import './gantt.css';

class GanttDiagram extends React.Component {
    taskFields: TaskFieldsModel;
    editSettings: EditSettingsModel;
    labelSettings: { rightLabel: string; };
    resourceFields: { id: string; name: string; };
    props: any;
    constructor(props: {}) {
        super(props);
        this.taskFields = {
            id: 'TaskID',
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
            className="gantt-container" 
            height="100%"
            dataSource={this.props.tasks}
            taskFields={this.taskFields} 
            editSettings={this.editSettings}
            resourceFields={this.resourceFields}
            resources={this.props.users}
            allowSelection={true}>
            <Inject services={[Edit, Selection]}/>
            </GanttComponent>);
    }
}

export default GanttDiagram;