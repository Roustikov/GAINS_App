import { useTable } from "react-table";
import './table.css'

export default function TableView(props) {
    const columns = [
        {
          Header: "Id",
          accessor: "id",
        },
        {
          Header: "Task Name",
          accessor: "TaskName",
        },
        {
          Header: "State",
          accessor: "State",
        }
      ];

    return (
      <div className="container-inner">
         <table>
      <thead>
          <tr>
            {columns.map((column) => (<th key={column.Header}>{column.Header}</th>))}
          </tr>
      </thead>
      <tbody>
        {props.tasks.map((task) => {
          return (
            <tr key={task.id}>
              {columns.map((column) => <td key={column.accessor}>{task[column.accessor]}</td>)}
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
    )
}

export const Reacttable = () => {}