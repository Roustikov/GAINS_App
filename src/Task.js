var React = require('react');

class Task extends React.Component {

    render() {
        return(
        <div>Id:{this.props.task.id} Name:{this.props.task.name} State: {this.props.task.state} Start:{this.props.task.start} End:{this.props.task.end}</div>
        )
    }
}

export default Task;