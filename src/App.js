import './App.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import MindMapContainer from './MindMap/MindMap'
import TableView from './MindMap/TableView.jsx'

import GanttDiagram from './Gantt/GanttDiagram';
import KanbanBoard from './Kanban/KanbanBoard';
import EditPopup from './Popup/EditPopup.tsx'
import DataProvider from './DataProvider.tsx'

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
                <div className="table-container">
                    <TableView tasks={this.dataProvider.mindMap}></TableView>
                    <MindMapContainer dataProvider={this.dataProvider}/>
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
    