const React = require('react');
const Task = require('../task');
const {Link} = require('react-router-dom');

class ToDoList extends React.Component {
    render() {
        const { tasks } = this.props;

        return (
          <React.Fragment>
            <h1>Lista de Tareas:</h1>
            <ul className="to-do-list">
              {
                tasks.map(task => (
                  <Task key={task.id} name={task.name} id={task.id} description={task.description}/>
                ))
              }
            </ul>
            <Link to={`/to-do-list/Alta/`}>Crear una tarea</Link><br/>
          </React.Fragment>
        );
    }
};

module.exports = ToDoList;
