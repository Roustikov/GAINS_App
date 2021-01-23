import React, { Component } from 'react'
import './projectSelector.css';
import PropTypes from "prop-types";
import { withRouter } from "react-router";

class ProjectSelector extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
      };
    
    constructor(props) {
        super(props);
        this.state = {
            projectId: 0,
            projects: []
        };
        this.dataProvider = props.dataProvider;
    }

    componentDidMount() {
        this.dataProvider.fetchProjectList((projects)=>{this.setState({projects:projects, projectId:projects[0].id})});
    }
    
    handleInputChange(event) {
        this.setState({projectId:+event.target.value});
    }

    openProject(e) {
        e.preventDefault();
        this.dataProvider.fetchTasksForProject(this.state.projectId, ()=>{
            this.props.history.push(`/tasks/${this.state.projectId}/`);
        });
    }

    render() {
        return (
            <div className="centered">
                <div className="title-container">
                    <span className="title">GAINS Project select</span>
                </div>
                <div className="input-group">
                <select name="project"
                    className="input-value"
                    type="text"
                    value={this.state.projectId}
                    onChange={this.handleInputChange.bind(this)}>
                    {this.state.projects.map(project=>{return <option value={project.id} key={project.id}>{project.name}</option>})}
                </select>
                </div>
                <div className="button-container">
                    <button onClick={this.openProject.bind(this)}> Open project</button>
                </div>
            </div>
        )
    }
}

const ProjectSelectorComponent = withRouter(ProjectSelector);

export default ProjectSelectorComponent;