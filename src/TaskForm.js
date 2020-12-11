var React = require('react');

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getNewForm();
    this.state.tasks = props.dataProvider.getSimpleTaskList();
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
    let taskIds = this.props.dataProvider.getTaskIdList();
    let nextId = Math.max(...taskIds)+1;
    return (
    {
      id: nextId,
      name: "New Task",
      start: new Date(),
      end: new Date(),
      description: "New Description",
      assignee: 0,
      progress: 0,
      dependency: 0,
      state: "ToDo"
    })
  }

  addTask = (event) => {

    let newTask = {
      TaskName: this.state.name,
      id: this.state.id,
      StartDate: new Date(this.state.start), 
      EndDate: new Date(this.state.end),
      Duration: this.state.duration,
      Progress: this.state.progress,
      ParentId: parseInt(this.state.dependency),
      State: this.state.state
    };
    
    this.props.addTaskCallback(newTask);
    // generate new id 
    this.setState(this.getNewForm()); 
    event.preventDefault();
    this.props.close();
  }

  render() {
    return (
      <div className="wrapper">
      <form onSubmit = {this.addTask} className="container">
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
          <select name="assignee"
            className="input-value"
            type="text"
            value={this.state.assignee}
            onChange={this.handleInputChange}>
            {this.props.dataProvider.getUsers().map(user=>{return <option value={user.id} key={user.id}>{user.fullName}</option>})}
          </select>
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
          <select name="dependency"
            className="input-value"
            type="text"
            value={this.state.dependencies}
            onChange={this.handleInputChange}>
            {this.props.dataProvider.getSimpleTaskList().map(task=>{return <option value={task.id} key={task.id}>{task.name}</option>})}
          </select>
        </div>

        <input className="add-task-button" type="submit" value = "Add task"/>
      </form>
      </div>
    );
  }
}

export default TaskForm;