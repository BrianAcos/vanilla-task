const React = require('react');
const { Route } = require('react-router-dom');
const ToDoList = require('../../components/to-do-list');
const Alta = require('../../components/alta');
const Baja = require('../../components/baja');
const Modificacion = require('../../components/modificacion');
const Detalles = require('../../components/detalles');

class ToDoListPage extends React.Component {
    render() {
        const { tasks } = this.props.initialState;
        return (
            <React.Fragment>
                <Route 
                path="/to-do-list/task/:id"
                render={(props) => <Detalles {...props} id={props.match.params.id} />}
                />
                <Route 
                path="/to-do-list/alta"
                render={(props) => <Alta {...props} />}
                />
                <Route 
                path="/to-do-list/baja"
                render={(props) => <Baja {...props} />}
                />
                <Route 
                path="/to-do-list/modificacion"
                render={(props) => <Modificacion {...props} />}
                />
                <Route
                exact
                path="/to-do-list"
                render={(props) => <ToDoList {...props} tasks={tasks} />}
                />
            </React.Fragment>
        );
    }
};

module.exports = ToDoListPage;
