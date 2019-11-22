const React = require('react');

class Modificacion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
        }

        this.modificarTarea = this.modificarTarea.bind(this);
    }

    modificarTarea() {
        fetch('/api/tasks/' + this.props.id, {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'PUT',
            body: JSON.stringify({
                name: this.props.name,
                description: this.props.description,
            }),
        })
            .then(() => window.location.href = "/to-do-list")
            .catch(() => this.setState({
                error: true,
            }))
    }

    render() {
        if (this.state.error) {
            return (
                <div>Ocurrio un error al cargar la tarea</div>
            );
        }
        return (
            <button onClick={this.modificarTarea}>Modificar</button>
        );
    }



};

module.exports = Modificacion;