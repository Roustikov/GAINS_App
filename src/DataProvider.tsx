export default class DataProvider {
    users: { userId: number; fullName: string; }[];
    tasks: { 
        id: number; State: "ToDo"|"Done"|"InProgress"|"Review", 
        Assignee: number; 
        TaskName: string; 
        StartDate: Date; 
        EndDate: Date; 
        Duration: number; 
        ParentId: number|undefined;
        Progress: number; 
        Predecessor?: string|undefined;
    }[];
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
            ParentId: undefined,
            Assignee: 0,
            Duration: 0,
            Progress: 50
        },
        {
            id: 1,
            State: "ToDo", 
            TaskName: 'Project Initiation',
            StartDate: new Date('04/02/2019'),
            EndDate: new Date('04/04/2019'),
            ParentId: 0,
            Assignee: 0,
            Duration: 0,
            Progress: 50
        },
        { 
            id: 2, 
            State: "Done", 
            TaskName: 'Identify Site location', 
            StartDate: new Date('04/02/2019'),
            EndDate: new Date('04/06/2019'),
            ParentId: 1,
            Assignee: 0,
            Duration: 0,
            Progress: 50
        },
        { 
            id: 3, 
            State: "Done", 
            TaskName: 'Perform Soil test', 
            StartDate: new Date('04/02/2019'), 
            EndDate: new Date('04/08/2019'),
            ParentId: 1,
            Assignee: 0,
            Duration: 0,
            Progress: 50
        },
        { 
            id: 4, 
            State: "ToDo", 
            TaskName: 'Soil test approval', 
            StartDate: new Date('04/02/2019'), 
            EndDate: new Date('04/10/2019'),
            ParentId: 1,
            Assignee: 0,
            Duration: 0,
            Progress: 50
        },
        {
            id: 5,
            State: "ToDo", 
            TaskName: 'Project Estimation',
            StartDate: new Date('04/02/2019'),
            EndDate: new Date('04/12/2019'),
            ParentId: 0,
            Assignee: 0,
            Duration: 0,
            Progress: 50
        },
        {   id: 6, 
            State: "ToDo", 
            TaskName: 'Develop floor plan for estimation1', 
            StartDate: new Date('04/04/2019'), 
            EndDate: new Date('04/10/2019'),
            ParentId: 5,
            Assignee: 0,
            Duration: 0,
            Progress: 50
        },
        { 
            id: 7, 
            State: "ToDo", 
            TaskName: 'List materials1', 
            StartDate: new Date('04/04/2019'), 
            EndDate: new Date('05/01/2019'),
            ParentId: 5,
            Assignee: 0,
            Duration: 0,
            Progress: 50
        },
        { 
            id: 8, 
            State: "ToDo", 
            TaskName: 'Estimation approval1', 
            StartDate: new Date('04/06/2019'), 
            EndDate: new Date('05/01/2019'),
            ParentId: 5,
            Assignee: 0,
            Duration: 0,
            Progress: 50
        },
        { 
            id: 9, 
            State: "ToDo", 
            TaskName: 'Develop floor plan for estimation2', 
            StartDate: new Date('04/06/2019'), 
            EndDate: new Date('05/01/2019'),
            ParentId: 8,
            Assignee: 0,
            Duration: 0,
            Progress: 50, 
            Predecessor: '8FS' 
        },
        { 
            id: 10, 
            State: "ToDo", 
            TaskName: 'List materials2', 
            StartDate: new Date('04/06/2019'), 
            EndDate: new Date('05/01/2019'),
            ParentId: 8,
            Assignee: 0,
            Duration: 0,
            Progress: 50,
            Predecessor: '9FS' 
        },
        { 
            id: 11, 
            State: "ToDo", 
            TaskName: 'Estimation approval2', 
            StartDate: new Date('04/06/2019'), 
            EndDate: new Date('05/01/2019'),
            ParentId: 8,
            Assignee: 0,
            Duration: 0,
            Progress: 50, 
            Predecessor: '10FS'
        },
        { 
            id: 12, 
            State: "ToDo", 
            TaskName: 'Develop floor plan for estimation3', 
            StartDate: new Date('04/06/2019'), 
            EndDate: new Date('05/01/2019'),
            ParentId: 11,
            Assignee: 0,
            Duration: 0,
            Progress: 50, 
            Predecessor: '11FS' 
        },
        { 
            id: 13, 
            State: "ToDo", 
            TaskName: 'List materials3', 
            StartDate: new Date('04/06/2019'), 
            EndDate: new Date('05/01/2019'),
            ParentId: 11,
            Assignee: 0,
            Duration: 0,
            Progress: 50,
            Predecessor: '12FS' 
        },
        { 
            id: 14, 
            State: "ToDo", 
            TaskName: 'Estimation approval3', 
            StartDate: new Date('04/08/2019'),
            EndDate: new Date('05/01/2019'), 
            ParentId: 11,
            Assignee: 0,
            Duration: 0,
            Progress: 50,
            Predecessor: '13FS'
        },
        { 
            id: 15, 
            State: "ToDo", 
            TaskName: 'Develop floor plan for estimation4', 
            StartDate: new Date('04/06/2019'),
            EndDate: new Date('05/01/2019'),
            ParentId: 14,
            Assignee: 0,
            Duration: 0,
            Progress: 50, 
            Predecessor: '11FS' 
        },
        { 
            id: 16, 
            State: "ToDo", 
            TaskName: 'List materials4', 
            StartDate: new Date('04/06/2019'),
            EndDate: new Date('05/01/2019'), 
            ParentId: 14,
            Assignee: 0,
            Duration: 0,
            Progress: 50,
            Predecessor: '12FS' 
        },
        { 
            id: 17, 
            State: "ToDo", 
            TaskName: 'Estimation approval4', 
            StartDate: new Date('04/08/2019'),
            EndDate: new Date('05/01/2019'), 
            ParentId: 14,
            Assignee: 0,
            Duration: 0,
            Progress: 50,
            Predecessor: '13FS'
        }];

        this.tasks.map(t=>{
            // The number of milliseconds in one day
            const ONE_DAY = 1000 * 60 * 60 * 24;
            // Calculate the difference in milliseconds
            const differenceMs = Math.abs(t.EndDate.getTime() - t.StartDate.getTime());
            // Convert back to days and return
            t.Duration = Math.round(differenceMs / ONE_DAY);
        })

        this.users = [
            {userId: 0, fullName:"Unassigned"},
            {userId: 1, fullName:"Eddard Stark"},
            {userId: 2, fullName:"Robert Baratheon"},
            {userId: 3, fullName:"Jaime Lannister"},
            {userId: 4, fullName:"Catelyn Stark"},
            {userId: 5, fullName:"Cersei Lannister"},
            {userId: 6, fullName:"Daenerys Targaryen"},
            {userId: 7, fullName:"Jorah Mormont"},
            {userId: 8, fullName:"Viserys Targaryen"},
            {userId: 9, fullName:"Jon Snow"},
            {userId: 10, fullName:"Robb Stark"},
            {userId: 11, fullName:"Sansa Stark"},
            {userId: 12, fullName:"Arya Stark"},
            {userId: 13, fullName:"Theon Greyjoy"},
            {userId: 14, fullName:"Brandon Stark"},
            {userId: 15, fullName:"Joffrey Baratheon"},
            {userId: 16, fullName:"Sandor Clegane"},
            {userId: 17, fullName:"Tyrion Lannister"}];    
    }

    addTask(task: any){
        this.tasks.push(task);
    }

    getTaskWithId(id: number){
        return this.tasks.find((x:any)=>{return x.id === id});
    }

    getTaskIdList(){
        return this.tasks.map((t:any)=>{return t.id});
    }

    getSimpleTaskList(){
        return this.tasks.map((t:any)=>{return {id:t.id, name:t.TaskName}});
    }
}
