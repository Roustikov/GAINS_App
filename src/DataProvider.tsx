export default class DataProvider {
    users: { id: number; fullName: string; }[];
    tasks: { id: number; State: "ToDo", TaskName: string; StartDate: Date; EndDate: Date; subtasks: ({ id: number; State: "ToDo", TaskName: string; StartDate: Date; Duration: number; Progress: number; EndDate?: undefined; subtasks?: undefined; } | { })[]; }[];
    refreshCallback: any;
    mindMap: any;

    constructor(refreshCallback:any) {
        this.refreshCallback = refreshCallback;
        this.tasks = [
        {
            id: 0,
            State: "ToDo", 
            TaskName: 'Project',
            StartDate: new Date('04/02/2019'),
            EndDate: new Date('04/21/2019'),
            subtasks: [
                {
                    id: 1,
                    State: "ToDo", 
                    TaskName: 'Project Initiation',
                    StartDate: new Date('04/02/2019'),
                    EndDate: new Date('04/21/2019'),
                    subtasks: [
                        { id: 2, State: "Done", TaskName: 'Identify Site location', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50 },
                        { id: 3, State: "Done", TaskName: 'Perform Soil test', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50 },
                        { id: 4, State: "ToDo", TaskName: 'Soil test approval', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50 },
                    ]
                },
                {
                    id: 5,
                    State: "ToDo", 
                    TaskName: 'Project Estimation',
                    StartDate: new Date('04/02/2019'),
                    EndDate: new Date('04/21/2019'),
                    subtasks: [
                        { id: 6, State: "ToDo", TaskName: 'Develop floor plan for estimation1', StartDate: new Date('04/04/2019'), Duration: 3, Progress: 50 },
                        { id: 7, State: "ToDo", TaskName: 'List materials1', StartDate: new Date('04/04/2019'), Duration: 3, Progress: 50 },
                        { id: 8, State: "ToDo", TaskName: 'Estimation approval1', StartDate: new Date('04/06/2019'), EndDate: new Date('04/07/2019'), subtasks: [
                            { id: 9, State: "ToDo", TaskName: 'Develop floor plan for estimation2', StartDate: new Date('04/06/2019'), Duration: 3, Progress: 50, Predecessor: '8FS' },
                            { id: 10, State: "ToDo", TaskName: 'List materials2', StartDate: new Date('04/06/2019'), Duration: 3, Progress: 50, Predecessor: '9FS' },
                            { id: 11, State: "ToDo", TaskName: 'Estimation approval2', StartDate: new Date('04/06/2019'), Duration: 3, Predecessor: '10FS', subtasks: [
                                { id: 12, State: "ToDo", TaskName: 'Develop floor plan for estimation3', StartDate: new Date('04/06/2019'), Duration: 3, Progress: 50, Predecessor: '11FS' },
                                { id: 13, State: "ToDo", TaskName: 'List materials3', StartDate: new Date('04/06/2019'), Duration: 3, Progress: 50, Predecessor: '12FS' },
                                { id: 14, State: "ToDo", TaskName: 'Estimation approval3', StartDate: new Date('04/08/2019'), Duration: 30, Progress: 50, Predecessor: '13FS', subtasks: [
                                    { id: 15, State: "ToDo", TaskName: 'Develop floor plan for estimation4', StartDate: new Date('04/06/2019'), Duration: 3, Progress: 50, Predecessor: '11FS' },
                                    { id: 16, State: "ToDo", TaskName: 'List materials4', StartDate: new Date('04/06/2019'), Duration: 3, Progress: 50, Predecessor: '12FS' },
                                    { id: 17, State: "ToDo", TaskName: 'Estimation approval4', StartDate: new Date('04/08/2019'), Duration: 30, Progress: 50, Predecessor: '13FS' }
                                ] }
                            ] }
                        ]  }
                    ]
                }
            ]
        }];
        
        this.mindMap = this.getFlatTasks();

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
        if(task.ParentId !== 0) {
            let parent = this.getTaskWithId(task.ParentId);
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
        this.mindMap = this.getFlatTasks();
    }

    getMindMap(){
        return this.mindMap;
    }

    getUsers(){
        return this.users;
    }

    getTasks(){
        return this.tasks;
    }

    getFlatTasks() {
        let flatTasks: any = [];
        this.tasks.map((task)=>{
            flatTasks = flatTasks.concat(this._parseTask(task, undefined));
        })

        return flatTasks;
    }

    _parseTask(task:any, ParentId: number | undefined) {
        let result: any = [task];
        if(ParentId !== undefined) {
            task.ParentId = ParentId;
        }

        if(Array.isArray(task.subtasks)) {
            task.subtasks.map((child:any)=>{
                return result = result.concat(this._parseTask(child, task.id))
            })
        }
        return result;
    }

    updateTask(id:number, name: string) {
        let task = this.getTaskWithId(id);
        task.TaskName = name;
        this.mindMap = this.getFlatTasks();
        this.refreshCallback(this.tasks);
    }

    getTaskWithId(id: number){
        let tasks = this.getFlatTasks();
        return tasks.find((x:any)=>{return x.id === id});
    }

    getTaskIdList(){
        return this.getFlatTasks().map((t:any)=>{return t.id});
    }

    getSimpleTaskList(){
        let tasks = this.getFlatTasks();
        let result = tasks.map((t:any)=>{return {id:t.id, name:t.TaskName}});
        return [{id: 0, name: "Project"}, ...result];
    }
}
