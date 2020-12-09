import './App.css';
import TaskForm from './TaskForm.js'
import TaskList from './TaskList.js'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Board from '@lourenci/react-kanban'
import '@lourenci/react-kanban/dist/styles.css'

import MindMapContainer from './MindMap/MindMap'
import GanttDiagram from './Gantt/GanttDiagram';
import DataProvider from './DataProvider.tsx'

var React = require('react');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.dataProvider = new DataProvider();
        this.state = {
            viewMode: "Month",
            tasks: [
                { id:"Task1", name:"Test1", state: "Done", start:"2020-11-20", end:"2021-02-24", progress:"100", dependencies:"" },
                { id:"Task2", name:"Test2", state: "ToDo", start:"2020-11-21", end:"2021-04-24", progress:"10", dependencies:"Task1" },
                { id:"Task3", name:"Test3", state: "ToDo", start:"2020-11-23", end:"2021-04-26", progress:"30", dependencies:"Task1" },
                { id:"Task4", name:"Test4", state: "ToDo", start:"2020-11-23", end:"2021-06-26", progress:"10", dependencies:"Task3" },
            ],
            board: {
                columns: {}
            },
        };
    }
    
    taskDragEnd(board, card, source, destination) {
        let changedState = [...this.state.tasks];
        let index = this.state.tasks.findIndex(element => element.id == card.id );
        changedState[index] = {...changedState[index], state: destination.toColumnId == 1 ? "ToDo" : "Done"};
        this.setState({tasks: changedState}, ()=>{console.log(this.state)});
    }

    addTask = (taskData) => {
        this.dataProvider.addTask(taskData);
        this.state.tasks.push(taskData);
        this.setState(this.state);
    }
    
    getBoard(){
        let columns = [
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
          ];
        columns[0].cards = this.state.tasks.filter(item => {item.title=item.name; return item.state==="ToDo";});
        columns[1].cards = this.state.tasks.filter(item => {item.title=item.name; return item.state==="Done";});
        return {columns: columns};
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
                <TaskForm 
                addTaskCallback={this.addTask} 
                tasks={this.state.tasks} 
                users={this.dataProvider.getUsers()}></TaskForm>
                <TaskList tasks={this.state.tasks}></TaskList>
            </div>
            </TabPanel>

            <TabPanel>
                <div>
                <Board initialBoard={this.getBoard()} onCardDragEnd={this.taskDragEnd.bind(this)}/>
                </div>
            </TabPanel>

            <TabPanel>
                <MindMapContainer mindMap={this.dataProvider.getMindMap()}/>
            </TabPanel>

            <TabPanel>
                <div className="gantt-container">
                    <GanttDiagram tasks={this.dataProvider.getTasks()} users={this.dataProvider.getUsers()}></GanttDiagram>
                </div>
            </TabPanel>

            </Tabs>
            
            </div>);
        }
    }
    
    export default App;
    