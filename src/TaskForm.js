var React = require('react');

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getNewForm();

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

  getNewForm(){
    let nextId = Math.max(...this.props.tasks.map(task=>task.id.replace('Task','')))+1;
    return (
    {
        id: "Task"+nextId,
        name: "Test"+nextId,
        description: "Test",
        assignee: "User",
        progress: nextId,
        start: "2020-11-23",
        end: "2021-11-23",
        state: "ToDo",
        dependencies: ''
    })
  }

  addTask = (event) => {
    this.props.addTaskCallback(this.state);
    // generate new id 
    this.setState(this.getNewForm()); 
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
          className="input-value"
          name="name"
          type="input"
          value={this.state.name}
          onChange={this.handleInputChange} />
          </div>

        <div className="input-group">
        <label>Description:</label>
          <input
            className="input-value"
            name="description"
            type="text"
            value={this.state.description}
            onChange={this.handleInputChange} />
        </div>

        <div className="input-group">
        <label>Assignee:</label>
          <input
            className="input-value"
            name="assignee"
            type="text"
            value={this.state.assignee}
            onChange={this.handleInputChange} />
        </div>

        <div className="input-group">
        <label>Progress:</label>
          <input
            className="input-value"
            name="progress"
            type="text"
            value={this.state.progress}
            onChange={this.handleInputChange} />
        </div>
        
        <div className="input-group">
        <label>Start date:</label>
          <input
            className="input-value"
            name="start"
            type="text"
            value={this.state.start}
            onChange={this.handleInputChange} />
        </div>
        
        <div className="input-group">
        <label>End date:</label>
          <input
            className="input-value"
            name="end"
            type="text"
            value={this.state.end}
            onChange={this.handleInputChange} />
        </div>

        <div className="input-group">
        <label>Dependency:</label>
          <select name="dependencies"
            className="input-value"
            type="text"
            value={this.state.dependencies}
            onChange={this.handleInputChange}>
              <option value=""> </option>
            {this.props.tasks.map(task=>{return <option value={task.id} key={task.id}>{task.id}</option>})}
          </select>
        </div>

        <input className="add-task-button" type="submit" value = "Add task"/>
        </div>
      </form>
      
    );
  }
}

export default TaskForm;