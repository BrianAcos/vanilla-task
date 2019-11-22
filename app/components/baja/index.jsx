const React = require('react');

class Baja extends React.Component {
    constructor(props) {
        super(props);

        this.borrarTarea = this.borrarTarea.bind(this);
    }

    borrarTarea() {
        fetch('/api/tasks/' + this.props.id, {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'DELETE',
        })
        .then(() => window.location.href="/to-do-list")
        .catch((err) => console.log(err)
        )
    }

    render() {
        return (
            <button onClick={this.borrarTarea}>borrar</button>
        );
    }



};

module.exports = Baja;