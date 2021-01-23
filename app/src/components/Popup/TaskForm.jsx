var React = require('react');

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.tasks = props.dataProvider.getSimpleTaskList();
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
    let depId = this.tasks.length != 0 ? this.tasks[0].id : 0;
    return (
    {
      id: 0,
      name: "New Task",
      start: new Date(),
      end: new Date(),
      description: "New Description",
      assignee: 0,
      progress: 0,
      duration: 0,
      dependency: depId,
      state: "ToDo"
    })
  }

  addTask = (event) => {
    let parent_id = this.state.dependency;
    if(parent_id === 0 || parent_id === '0') {
      parent_id = null;
    }

    let newTask = {
      name: this.state.name,
      id: this.state.id,
      start_date: new Date(this.state.start), 
      end_date: new Date(this.state.end),
      duration: this.state.duration,
      progress: this.state.progress,
      parent_id: parseInt(parent_id),
      state: this.state.state
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
            {this.props.dataProvider.users.map(user=>{return <option value={user.userId} key={user.userId}>{user.fullName}</option>})}
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
            value={this.state.dependency}
            onChange={this.handleInputChange}>
            {this.tasks.map(task=>{return <option value={task.id} key={task.id}>{task.name}</option>})}
          </select>
        </div>

        <input className="add-task-button" type="submit" value = "Add task"/>
      </form>
      </div>
    );
  }
}

export default TaskForm;