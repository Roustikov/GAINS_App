import { Inject } from '@syncfusion/ej2-react-gantt';
import { Edit } from '@syncfusion/ej2-react-gantt';
import { GanttComponent } from '@syncfusion/ej2-react-gantt';
import * as React from 'react';
import './gantt.css';
const GanttData = [
    {
        TaskID: 1,
        TaskName: 'Project Initiation',
        StartDate: new Date('04/02/2019'),
        EndDate: new Date('04/21/2019'),
        subtasks: [
            { TaskID: 2, TaskName: 'Identify Site location', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50 },
            { TaskID: 3, TaskName: 'Perform Soil test', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50 },
            { TaskID: 4, TaskName: 'Soil test approval', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50 },
        ]
    },
    {
        TaskID: 5,
        TaskName: 'Project Estimation',
        StartDate: new Date('04/02/2019'),
        EndDate: new Date('04/21/2019'),
        subtasks: [
            { TaskID: 6, TaskName: 'Develop floor plan for estimation', StartDate: new Date('04/04/2019'), Duration: 3, Progress: 50 },
            { TaskID: 7, TaskName: 'List materials', StartDate: new Date('04/04/2019'), Duration: 3, Progress: 50 },
            { TaskID: 8, TaskName: 'Estimation approval', StartDate: new Date('04/06/2019'), EndDate: new Date('04/07/2019'), subtasks: [
                { TaskID: 9, TaskName: 'Develop floor plan for estimation', StartDate: new Date('04/06/2019'), Duration: 3, Progress: 50, Predecessor: '8FS' },
                { TaskID: 10, TaskName: 'List materials', StartDate: new Date('04/06/2019'), Duration: 3, Progress: 50, Predecessor: '9FS' },
                { TaskID: 11, TaskName: 'Estimation approval', StartDate: new Date('04/06/2019'), Duration: 3, Predecessor: '10FS', subtasks: [
                    { TaskID: 12, TaskName: 'Develop floor plan for estimation', StartDate: new Date('04/06/2019'), Duration: 3, Progress: 50, Predecessor: '11FS' },
                    { TaskID: 13, TaskName: 'List materials', StartDate: new Date('04/06/2019'), Duration: 3, Progress: 50, Predecessor: '12FS' },
                    { TaskID: 14, TaskName: 'Estimation approval', StartDate: new Date('04/08/2019'), Duration: 4, Progress: 50, Predecessor: '13FS' }
                ] }
            ]  }
        ]
    },
];
class GanttDiagram extends React.Component {
    taskFields: { id: string; name: string; startDate: string; duration: string; progress: string; child: string; dependency: string; };
    editSettings: { allowTaskbarEditing: boolean; };
    constructor(props: {}) {
        super(props);
        this.taskFields = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            duration: 'Duration',
            progress: 'Progress',
            child: 'subtasks',
            dependency: 'Predecessor'
        };
        this.editSettings = {
            allowTaskbarEditing: true
        };
    }
    render() {
        return (<GanttComponent className="gantt-container" dataSource={GanttData} height="100%" taskFields={this.taskFields} editSettings={this.editSettings}>
            <Inject services={[Edit]}/>
            </GanttComponent>);
    }
}

export default GanttDiagram;