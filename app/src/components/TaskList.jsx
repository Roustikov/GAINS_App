import Task from "./Task";
var React = require('react');

class TaskList extends React.Component {

    render() {
        let tasks = this.props.tasks.map(task => {return <Task task={task} key={task.id}/>});
        
        return(
        <div className="container wide">
            <label>Task List</label>
            {tasks}</div>
        )
    }
}

export default TaskList;