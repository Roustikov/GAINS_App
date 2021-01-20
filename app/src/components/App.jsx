import './App.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import MindMapContainer from './MindMap/MindMap'
import TableView from './MindMap/TableView'

import GanttDiagram from './Gantt/GanttDiagram';
import KanbanBoard from './Kanban/KanbanBoard';
import EditPopup from './Popup/EditPopup'
import DataProvider from './DataProvider'

import { SplitterComponent, PanesDirective, PaneDirective } from '@syncfusion/ej2-react-layouts';

var React = require('react');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.dataProvider = {};
        this.state = {
            tasks: this.dataProvider.tasks,
            users: this.dataProvider.users,
            loaded: false
        };
    }

    componentDidMount() {
        this.dataProvider = new DataProvider(this.refresh.bind(this));
    }

    refresh() {
        this.setState({tasks:this.dataProvider.tasks});
    }

    addTask = (taskData) => {
        this.dataProvider.addTask(taskData);
    }

    editCallback(event) {
        if(Array.isArray(event.data)) {
            event.data.map((t)=>{this.dataProvider.updateTask(t)});
        } else {
            this.dataProvider.updateTask(event.data)
        }
        this.refresh();
    }

    deleteCallback(event) {
        event.data.map((t)=>{
            this.dataProvider.deleteTask(t);
        });
    }

    render() {
        return (
            <div className="App">
            <Tabs>
            <TabList>
            <EditPopup addTaskCallback={this.addTask.bind(this)}
                dataProvider={this.dataProvider}></EditPopup>
            <Tab>Mind Map</Tab>
            <Tab>Gantt Diagram</Tab>
            <Tab>Kanban Board</Tab>
            </TabList>

            <TabPanel>
                <div className="mindmap-container">
                    <SplitterComponent height="100%" width="100%" separatorSize={2}>
                        <PanesDirective>
                            <PaneDirective size="25%" min="0px" content={()=>{return(<TableView tasks={this.state.tasks} editCallback={this.editCallback.bind(this)} deleteCallback={this.deleteCallback.bind(this)}></TableView>)}}/>
                            <PaneDirective size="75%" min="60px" content={()=>{return(<MindMapContainer tasks={this.state.tasks} editCallback={this.editCallback.bind(this)} deleteCallback={this.deleteCallback.bind(this)}/>)}}/>
                        </PanesDirective>
                    </SplitterComponent>
                </div>
            </TabPanel>

            <TabPanel>
                <div className="gantt-container">
                    <GanttDiagram tasks={this.state.tasks} users={this.state.users} editCallback={this.editCallback.bind(this)} deleteCallback={this.deleteCallback.bind(this)}></GanttDiagram>
                </div>
            </TabPanel>

            <TabPanel>
                <div className="gantt-container">
                    <KanbanBoard tasks={this.state.tasks} editCallback={this.editCallback.bind(this)} deleteCallback={this.deleteCallback.bind(this)}></KanbanBoard>
                </div>
            </TabPanel>

            </Tabs>
            
            </div>);
        }
    }
    
    export default App;
    