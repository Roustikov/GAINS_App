import './App.css';
import TaskForm from './TaskForm.js'
import ReactGantt from 'gantt-for-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

var React = require('react');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: "Month",
            tasks: [ 
                { id:"Task1", name:"Test1", start:"2020-11-20", end:"2021-02-24", progress:"80", dependencies:"" },
                { id:"Task2", name:"Test2", start:"2020-11-21", end:"2021-04-24", progress:"10", dependencies:"" },
                { id:"Task3", name:"Test3", start:"2020-11-23", end:"2021-04-26", progress:"30", dependencies:"Task1,Task2" },
                { id:"Task4", name:"Test4", start:"2020-11-23", end:"2021-06-26", progress:"10", dependencies:"Task3" },
            ]
        }
    }
    
    addTask = (taskData) => {
        this.state.tasks.push(taskData);
        this.setState(this.state);
    }
    
    getTasks(){
        return this.state.tasks;
    }
    
    render() {
        return (
            <div className="App">
            <Tabs>
            <TabList>
            <Tab>Edit Tasks</Tab>
            <Tab>Kanban Board</Tab>
            <Tab>Mind Map</Tab>
            <Tab>Gantt Diagram</Tab>
            </TabList>
            
            <TabPanel>
            <TaskForm addTaskCallback={this.addTask}></TaskForm>            
            </TabPanel>

            <TabPanel>
            </TabPanel>

            <TabPanel>
            </TabPanel>

            <TabPanel>
                <div>
                    <ReactGantt tasks={this.getTasks()} viewMode={this.state.viewMode}></ReactGantt>
                </div>
            </TabPanel>

            </Tabs>
            
            </div>);
        }
    }
    
    export default App;
    