var React = require('react');

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        id: "Task6",
        name: "Task6",
        description: "Test",
        assignee: "User",
        progress: "80",
        start: "2020-11-23",
        end: "2021-11-23",
        state: "ToDo"
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  addTask = (event) => {
    this.props.addTaskCallback(this.state);
    // generate new id
    this.setState({
        id: "",
        name: "",
        description: "",
        assignee: "",
        progress: "",
        start: "",
        end: "",
        state: "ToDo"
    })
    
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit = {this.addTask} className="container">
        <div>
      <label>Create new task</label>

        <div className="input-group">
        <label>Title:</label>
        <input
          name="name"
          type="input"
          value={this.state.name}
          onChange={this.handleInputChange} />
          </div>

        <div className="input-group">
        <label>Description:</label>
          <input
            name="description"
            type="text"
            value={this.state.description}
            onChange={this.handleInputChange} />
        </div>

        <div className="input-group">
        <label>Assignee:</label>
          <input
            name="assignee"
            type="text"
            value={this.state.assignee}
            onChange={this.handleInputChange} />
        </div>

        <div className="input-group">
        <label>Progress:</label>
          <input
            name="progress"
            type="text"
            value={this.state.progress}
            onChange={this.handleInputChange} />
        </div>
        
        <div className="input-group">
        <label>Start date:</label>
          <input
            name="start"
            type="text"
            value={this.state.start}
            onChange={this.handleInputChange} />
        </div>
        
        <div className="input-group">
        <label>End date:</label>
          <input
            name="end"
            type="text"
            value={this.state.end}
            onChange={this.handleInputChange} />
        </div>
        <input className="add-task-button" type="submit" value = "Add task"/>
        </div>
      </form>
      
    );
  }
}

export default TaskForm;