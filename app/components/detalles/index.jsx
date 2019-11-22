const React = require('react');
const Baja = require('../baja');
const Modificacion = require('../modificacion');
const { Redirect } = require('react-router');

class Detalles extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            task: {},
            loading: true,
            error: null,
            modificacion: false,
        }

        this.redireccionar = this.redireccionar.bind(this);
        this.modificar = this.modificar.bind(this);
        this.guardarName = this.guardarName.bind(this);
        this.guardarDescription = this.guardarDescription.bind(this);
    }

    componentDidMount() {
        setInterval(() => {     //ESTABLESCO UN ITERVALO DE TIEMPO DE 1 SEGUNDOS PARA QUE EJECUTE EL FETCH
            fetch(`/api/tasks/${this.props.id}`)       //VA A LA API A BUSCAR LOS DATOS SOBRE ESA TAREA Y LOS CARGA EN EL ESTADO
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        task: data.task,
                        loading: false,
                        error: false,
                    });
                })
                .catch((err) => {
                    console.error(err);
                    this.setState({
                        task: null,
                        loading: false,
                        error: true,
                    });
                });
        }, 1000);

    }

    redireccionar() {
        this.setState({
            redirect: true,
        });
    }

    guardarName(event) {    //GUARDA EL VALOR DEL INPUT EN EL ESTADO
        this.name = event.target.value;
    }

    guardarDescription(event) {
        this.description = event.target.value;
    }

    modificar() {
        this.setState({
            modificacion: true,
        })
    }

    render() {
        if (this.state.loading) {   //SI EL ESTADO DEL COMPONENTE ESTA CARGANDO APARECE EL MENSAJE CARGANDO EN LA PANTALLA POR DEFECTO 1 SEGUNDO
            return (
                <div>Cargando...</div>
            )
        }

        if (this.state.error) {     //SI EL ESTADO DEL COMPONENTE ES ERROR APARECE EL MENSAJE DE ERROR
            return (
                <div>Ocurrio un error</div>
            )
        }

        if (this.state.redirect) {
                return (
                    <div><Redirect to="/to-do-list"/></div>  //REDIRECT SIN RECARGAR LA PAGINA
                )
            }

        return (
            <ul>
                <li>
                    <svg onClick={this.redireccionar} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z" /><p>ATRAS</p></svg>
                </li>
                <li>
                    Tarea numero  {this.props.id}
                </li>
                <li>
                    {
                        this.state.modificacion ?
                            <div>
                                <label htmlFor="name">Nombre:</label> <input onChange={this.guardarName} type="text" id="name" />
                                <label htmlFor="description">descripcion:</label> <input onChange={this.guardarDescription} type="text" id="description" />
                                <Modificacion id={this.props.id} name={this.name} description={this.description} />
                            </div>
                            : <div>{this.state.task.name}: {this.state.task.description}</div>
                    }
                </li>
                <Baja id={this.props.id} />
                {
                    this.state.modificacion ? null : <button onClick={this.modificar}>Modificar</button>
                }

            </ul>
        );
    }
};

module.exports = Detalles;