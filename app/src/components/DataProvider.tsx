export default class DataProvider {
    users: { userId: number; fullName: string; }[];
    tasks: { 
        id: number; State: "ToDo"|"Done"|"InProgress"|"Review", 
        assignee: number; 
        name: string;
        description: string;
        start_date: Date; 
        end_date: Date; 
        duration: number; 
        parent_id: number|undefined;
        progress: number; 
        predecessor?: string|undefined;
        project_id: number;
    }[];
    projects: any;
    refreshCallback: any;
    mindMap: any;
    loaded: boolean;
    currentProject: number;

    constructor(refreshCallback:any) {
        this.refreshCallback = refreshCallback;
        this.tasks = [];
        this.loaded = false;
        this.currentProject = 0;

        this.users = [
            {userId: 0,  fullName:"Unassigned"},
            {userId: 1,  fullName:"Eddard Stark"},
            {userId: 2,  fullName:"Robert Baratheon"},
            {userId: 3,  fullName:"Jaime Lannister"},
            {userId: 4,  fullName:"Catelyn Stark"},
            {userId: 5,  fullName:"Cersei Lannister"},
            {userId: 6,  fullName:"Daenerys Targaryen"},
            {userId: 7,  fullName:"Jorah Mormont"},
            {userId: 8,  fullName:"Viserys Targaryen"},
            {userId: 9,  fullName:"Jon Snow"},
            {userId: 10, fullName:"Robb Stark"},
            {userId: 11, fullName:"Sansa Stark"},
            {userId: 12, fullName:"Arya Stark"},
            {userId: 13, fullName:"Theon Greyjoy"},
            {userId: 14, fullName:"Brandon Stark"},
            {userId: 15, fullName:"Joffrey Baratheon"},
            {userId: 16, fullName:"Sandor Clegane"},
            {userId: 17, fullName:"Tyrion Lannister"}];    
    }

    fetchProjectList(callback:any) {
        fetch(`/api/projects/`)
        .then(response => {
            if (response.status > 400) {              
                    debugger;
                    console.log("Something went wrong!");
                    console.log(response);
                    return { placeholder: "Something went wrong!" };
            }
            return response.json();
        })
        .then(data => {
            this.projects = data;
            callback(data);
        });
    }

    fetchTasksForProject(projectId:number, callback: any) {
        fetch(`/api/tasks/${projectId}/`)
        .then(response => {
            if (response.status > 400) {              
                    debugger;
                    console.log("Something went wrong!");
                    console.log(response);
                    return { placeholder: "Something went wrong!" };
            }
            return response.json();
        })
        .then(data => {
            this.tasks = data;
            this.tasks.map(t=>{
                t.duration = this.durationBetween(t.start_date, t.end_date);
            });
            this.loaded = true;
            callback();
            this.refreshCallback(this.tasks);
        });
    }

    addTask(task: any, callback: any){
        task.project_id = this.currentProject;
        this.postTask(task, callback);
    }

    postTask(task:any, callback: any) {
        if(task.id < 0) {
            task.id = 1;
        }
        
        this.sendRequest(task, `/api/task/${task.id}/`, "POST", (data: any)=>{
            task.id = data.id;
            this.tasks.push(task);
            callback(this.tasks);
        });
    }
    
    updateTask(task:any) {
        let taskToUpdate = this.getTaskWithId(task.id);
        if(taskToUpdate === undefined) { //New task created via MindMap
            this.addTask(task, ()=>{
                console.log(`Task: ${task} Created via MindMap.`);
            });
            return;
        }

        this.copy(task, taskToUpdate);
        if(taskToUpdate?.predecessor === null) {
            taskToUpdate.predecessor = '';
        }

        if(taskToUpdate.name === "") {
            taskToUpdate.name = ' ';
        }

        this.sendRequest(task, `/api/task/${task.id}/`, "PATCH", (data: any)=>{});
    }

    deleteTask(task:any) {
        this.sendRequest(task, `/api/task/${task.id}/`, "DELETE", (data: any)=>{
            this.fetchTasksForProject(this.currentProject, ()=>{
                console.log(`Tasks for project ${this.currentProject} have been fetched successfully.`)
            });
        });
    }

    sendRequest(task:any, url:string, method:string, callback:Function) {
        task.duration = this.durationBetween(task.start_date, task.end_date);
        if (typeof task.start_date !== "string") {
            task.start_date = task.start_date.toLocaleDateString('en-CA'); // (year-month-day)
        }
        if (typeof task.end_date !== "string") {
            task.end_date = task.end_date.toLocaleDateString('en-CA'); // (year-month-day)
        }

        const requestOptions = {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        };
        fetch(url, requestOptions)
            .then(async response => {
                if (!response.ok) {
                    const data = await response.text();
                    // get error message from body or default to response status
                    const error = {
                        status: response.status,
                        statusText: response.statusText,
                        errorText: data
                    };
                    return Promise.reject([error, requestOptions]);
                }
                    let resp = response.json();
                    return resp;
                })
            .then(data => {
                callback(data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    getTaskWithId(id: number){
        return this.tasks.find((x:any)=>{return x.id === id});
    }

    getTaskIdList(){
        return this.tasks.map((t:any)=>{return t.id});
    }

    getSimpleTaskList(){
        return this.tasks.map((t:any)=>{return {id:t.id, name:t.name}});
    }

    durationBetween(start:any, end:any) {
        if(typeof start === "string") {
            start = new Date(start);
        }

        if(typeof end === "string") {
            end = new Date(end);
        }
        // The number of milliseconds in one day
        const ONE_DAY = 1000 * 60 * 60 * 24;
        // Calculate the difference in milliseconds
        const differenceMs = Math.abs(new Date(end).getTime() - new Date(start).getTime());
        // Convert back to days and return
        return Math.round(differenceMs / ONE_DAY);
    }

    copy(source:any, dest:any) {
        dest.id = source.id;
        dest.name = source.name;
        dest.parent_id = source.parent_id;
        dest.assignee = source.assignee;
        dest.start_date = source.start_date;
        dest.end_date = source.end_date;
        dest.progress = source.progress;
        dest.description = source.description;
        dest.predecessor = source.predecessor;
        dest.duration = source.duration;
        dest.project_id = source.project_id;
    }
}
