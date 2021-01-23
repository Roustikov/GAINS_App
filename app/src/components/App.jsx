import './App.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import MindMapContainer from './MindMap/MindMap'
import TableView from './MindMap/TableView'

import GanttDiagram from './Gantt/GanttDiagram';
import KanbanBoard from './Kanban/KanbanBoard';
import EditPopup from './Popup/EditPopup'
import DataProvider from './DataProvider'
import ProjectSelector from './ProjectSelector/ProjectSelector'
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import { SplitterComponent, PanesDirective, PaneDirective } from '@syncfusion/ej2-react-layouts';

import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

var React = require('react');

class App extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
      };

    constructor(props) {
        super(props);
        this.dataProvider = new DataProvider(this.refresh.bind(this));

        this.state = {
            tasks: this.dataProvider.tasks,
            users: this.dataProvider.users,
            loaded: false
        };
    }

    componentDidMount() {
        if(this.props.location.pathname.includes('tasks')) { // First loading with direct URL like /tasks/1/
            let pathArr = this.props.location.pathname.split('/');
            this.dataProvider.currentProject = +pathArr[pathArr.length-2];
            this.dataProvider.fetchTasksForProject(this.dataProvider.currentProject, ()=>{
                console.log(`Tasks for project ${this.dataProvider.currentProject} have been fetched successfully.`)
            });
        }
    }

    refresh(tasks) {
        this.setState({tasks:this.dataProvider.tasks});
        this.forceUpdate();
    }

    addTask = (taskData) => {
        this.dataProvider.addTask(taskData, this.refresh.bind(this));
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
                <Router>
                    <Switch>
                    <Route exact path="/">
                        <ProjectSelector dataProvider={this.dataProvider}></ProjectSelector>
                    </Route>
                    <Route path="/tasks/:id/">
                        <Tabs>
                        <TabList>
                        <a href="/">
                        <button className="button add-task">Project List</button>
                        </a>
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
                    </Route>
                    </Switch>
                </Router>
                        
            </div>);
        }
    }
    
    export default withRouter(App);
    