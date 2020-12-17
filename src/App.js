import './App.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import MindMapContainer from './MindMap/MindMap'
import TableView from './MindMap/TableView.jsx'

import GanttDiagram from './Gantt/GanttDiagram';
import KanbanBoard from './Kanban/KanbanBoard';
import EditPopup from './Popup/EditPopup.tsx'
import DataProvider from './DataProvider.tsx'

import { SplitterComponent, PanesDirective, PaneDirective } from '@syncfusion/ej2-react-layouts';

var React = require('react');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.dataProvider = new DataProvider(this.refresh.bind(this));
        this.state = {
            tasks: this.dataProvider.tasks,
            users: this.dataProvider.users,
        };
    }

    refresh(dataProviderTasks) {
        // this.setState({tasks:dataProviderTasks})
    }

    addTask = (taskData) => {
        this.dataProvider.addTask(taskData);
        this.setState({tasks: this.dataProvider.tasks, mindMap: this.dataProvider.tasks});
    }

    mindMapActionComplete = (event) => {
        if(event.name === "textEdit") {
            let task = event.element.data;
            task.TaskName = event.newValue;   
        }
        this.setState({mindMap:this.dataProvider.tasks})
    }

    tableActionComplete = (event) => {
        if(event.name === "actionComplete") {
            let task = this.dataProvider.tasks.find(task=>task.id === event.data.id);
            task.StartDate = event.data.StartDate;
            task.EndDate = event.data.EndDate;
            task.Duration = event.data.Duration;
            task.Progress = event.data.Progress;
            task.Assignee = event.data.Assignee;
            task.TaskName = event.data.TaskName;   
            task.State = event.data.State;

            const ONE_DAY = 1000 * 60 * 60 * 24;
            if(event.column.field === 'Duration') {
                let d = event.data.StartDate;
                task.EndDate = new Date(d.getFullYear(), d.getMonth(), d.getDate()+event.data.Duration);
            } else {
                const differenceMs = Math.abs(event.data.EndDate.getTime() - event.data.StartDate.getTime());
                task.Duration = Math.round(differenceMs / ONE_DAY);
            }
        }
        this.setState({tasks:this.dataProvider.tasks})
    }

    render() {
        return (
            <div className="App">
            <Tabs>
            <TabList>
            <EditPopup addTaskCallback={this.addTask}
                dataProvider={this.dataProvider}></EditPopup>
            <Tab>Mind Map</Tab>
            <Tab>Gantt Diagram</Tab>
            <Tab>Kanban Board</Tab>
            </TabList>

            <TabPanel>
                <div className="mindmap-container">
                    <SplitterComponent height="100%" width="100%" separatorSize={2}>
                        <PanesDirective>
                            <PaneDirective size="25%" min="0px" content={()=>{return(<TableView tasks={this.state.tasks} actionComplete={this.tableActionComplete.bind(this)}></TableView>)}}/>
                            <PaneDirective size="75%" min="60px" content={()=>{return(<MindMapContainer tasks={this.state.tasks} actionComplete={this.mindMapActionComplete.bind(this)}/>)}}/>
                        </PanesDirective>
                    </SplitterComponent>
                </div>
            </TabPanel>

            <TabPanel>
                <div className="gantt-container">
                    <GanttDiagram tasks={this.state.tasks} users={this.state.users}></GanttDiagram>
                </div>
            </TabPanel>

            <TabPanel>
                <div className="gantt-container">
                    <KanbanBoard tasks={this.state.tasks}></KanbanBoard>
                </div>
            </TabPanel>

            </Tabs>
            
            </div>);
        }
    }
    
    export default App;
    