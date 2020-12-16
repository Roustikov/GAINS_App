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
            tasks: this.dataProvider.getTasks(),
            users: this.dataProvider.getUsers(),
            mindMap: this.dataProvider.getMindMap()
        };
    }

    refresh(dataProviderTasks) {
        // this.setState({tasks:dataProviderTasks})
    }

    addTask = (taskData) => {
        this.dataProvider.addTask(taskData);
        this.setState({tasks: this.dataProvider.getTasks(), mindMap: this.dataProvider.getMindMap()});
    }

    actionComplete = (args) => {
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
                    <SplitterComponent height="100%" width="100%" separatorSize={4}>
                        <PanesDirective>
                            <PaneDirective size="25%" min="0px" content={()=>{return(<TableView tasks={this.state.tasks} actionComplete={this.actionComplete.bind(this)}></TableView>)}}/>
                            <PaneDirective size="75%" min="60px" content={()=>{return(<MindMapContainer tasks={this.state.mindMap} actionComplete={this.actionComplete.bind(this)}/>)}}/>
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
                    <KanbanBoard tasks={this.state.mindMap}></KanbanBoard>
                </div>
            </TabPanel>

            </Tabs>
            
            </div>);
        }
    }
    
    export default App;
    