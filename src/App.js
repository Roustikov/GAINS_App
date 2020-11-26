import './App.css';
import TaskForm from './TaskForm.js'
import TaskList from './TaskList.js'
import ReactGantt from 'gantt-for-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Board from '@lourenci/react-kanban'
import '@lourenci/react-kanban/dist/styles.css'

var React = require('react');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: "Month",
            tasks: [
                { id:"Task1", name:"Test1", state: "Done", start:"2020-11-20", end:"2021-02-24", progress:"100", dependencies:"" },
                { id:"Task2", name:"Test2", state: "ToDo", start:"2020-11-21", end:"2021-04-24", progress:"10", dependencies:"" },
                { id:"Task3", name:"Test3", state: "ToDo", start:"2020-11-23", end:"2021-04-26", progress:"30", dependencies:"Task1,Task2" },
                { id:"Task4", name:"Test4", state: "ToDo", start:"2020-11-23", end:"2021-06-26", progress:"10", dependencies:"Task3" },
            ], 
            board: {
                columns: [
                  {
                    id: 1,
                    title: 'ToDo:',
                    cards: []
                  },
                  {
                    id: 2,
                    title: 'Done:',
                    cards: []
                  }
                ]
            }
        };

        this.state.done = this.state.tasks.filter(item => {if(item.state==="Done"){item.title=item.name; return item}});
        this.state.todo = this.state.tasks.filter(item => {if(item.state==="ToDo"){item.title=item.name; return item}});
        this.state.board.columns[0].cards = this.state.todo;
        this.state.board.columns[1].cards = this.state.done;
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
            <div className="wrapper">
                <TaskForm addTaskCallback={this.addTask}></TaskForm>
                <TaskList tasks={this.state.tasks}></TaskList>
            </div>
            </TabPanel>

            <TabPanel>
                <div>
                <Board initialBoard={this.state.board} />
                </div>
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
    