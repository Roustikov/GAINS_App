import { Component } from 'react'

export default class DataProvider extends Component {
    users: { id: number; fullName: string; }[];
    tasks: { TaskID: number; TaskName: string; StartDate: Date; EndDate: Date; subtasks: ({ TaskID: number; TaskName: string; StartDate: Date; Duration: number; Progress: number; EndDate?: undefined; subtasks?: undefined; } | { })[]; }[];
    
    constructor(props: {}) {
        super(props);
        this.tasks = [{
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
                        { TaskID: 14, TaskName: 'Estimation approval', StartDate: new Date('04/08/2019'), Duration: 30, Progress: 50, Predecessor: '13FS', subtasks: [
                            { TaskID: 15, TaskName: 'Develop floor plan for estimation', StartDate: new Date('04/06/2019'), Duration: 3, Progress: 50, Predecessor: '11FS' },
                            { TaskID: 16, TaskName: 'List materials', StartDate: new Date('04/06/2019'), Duration: 3, Progress: 50, Predecessor: '12FS' },
                            { TaskID: 17, TaskName: 'Estimation approval', StartDate: new Date('04/08/2019'), Duration: 30, Progress: 50, Predecessor: '13FS' }
                        ] }
                    ] }
                ]  }
            ]
        }];
        
        this.users = [
            {id: 0, fullName:"Unassigned"},
            {id: 1, fullName:"Eddard Stark"},
            {id: 2, fullName:"Robert Baratheon"},
            {id: 3, fullName:"Jaime Lannister"},
            {id: 4, fullName:"Catelyn Stark"},
            {id: 5, fullName:"Cersei Lannister"},
            {id: 6, fullName:"Daenerys Targaryen"},
            {id: 7, fullName:"Jorah Mormont"},
            {id: 8, fullName:"Viserys Targaryen"},
            {id: 9, fullName:"Jon Snow"},
            {id: 10, fullName:"Robb Stark"},
            {id: 11, fullName:"Sansa Stark"},
            {id: 12, fullName:"Arya Stark"},
            {id: 13, fullName:"Theon Greyjoy"},
            {id: 14, fullName:"Brandon Stark"},
            {id: 15, fullName:"Joffrey Baratheon"},
            {id: 16, fullName:"Sandor Clegane"},
            {id: 17, fullName:"Tyrion Lannister"}];    
    }

    readData() {
        return ({tasks: this.getTasks(), users: this.getUsers()})
    }

    addTask(task: any){
        if(task.parentId != 0) {
            let parent = this.tasks.find(t=>t.TaskID == task.parentId);
            if(parent) {
                if(Array.isArray(parent.subtasks)) {
                    parent.subtasks.push(task);
                } else {
                    parent.subtasks = [task];
                }
            }
        } else {
            this.tasks.push(task);
        }
    }

    parseTaskList(list: any[]) {
        let tasks: any = [];
        list.map((task)=>{
            tasks = tasks.concat(this.parseTask(task, 0));
        });
        return tasks;
    }

    parseTask(task: any, parent: number){
        let tasksArray:any[] = [
            {
                id: task.TaskID,
                Label: task.TaskName,
                parentId: parent
            }
        ];

        if(Array.isArray(task.subtasks)) {
            task.subtasks.map((childTask: any)=>{
                let childTasks = this.parseTask(childTask, task.TaskID);
                tasksArray = tasksArray.concat(childTasks);
            });
        }

        return tasksArray;
    }

    getMindMap(){
        let mapData = [{
            id: 0,
            Label: 'Project'
        }];

        mapData = mapData.concat(this.parseTaskList(this.getTasks()));
        
        return mapData;
    }

    getUsers(){
        return this.users;
    }

    getTasks(){
        return this.tasks;
    }
}
