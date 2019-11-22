const React = require('react');
const {Redirect} = require('react-router');    //REDIRECT SIN RECARGAR LA PAGINA 

class Alta extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            redirect: false,    //REDIRECT SIN RECARGAR LA PAGINA 
            error: null,
        }

        this.redireccionar = this.redireccionar.bind(this);
        this.crearTarea = this.crearTarea.bind(this);
        this.guardarName = this.guardarName.bind(this);
        this.guardarDescription = this.guardarDescription.bind(this);
    }

    crearTarea() {      // MANDO UN FETCH A MI API CON POST Y LE PONGO EN EL BODY LOS DATOS DEL FORMULARIO QUE CARGUE EN EL ESTADO CON EL BOTON CREAR SE EJECUTA EL FETCH
        fetch('/api/tasks', {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'POST',
            body: JSON.stringify({
                name: this.name,
                description: this.description,
            }),
        })
        .then(() => window.location.href="/to-do-list")  //REDIRIJO A MI PAGINA PRINCIPAL
        .catch((err) => this.setState({error: 'error'}))    //SI HAY UN ERROR LO CARGO EN EL ESTADO Y DIPARA EL RENDER SACANDO UN MENSAJE DE ERROR
    }

    guardarName(event) {    //GUARDA EL VALOR DEL INPUT EN EL ESTADO
        this.name = event.target.value;
    }

    guardarDescription(event) {
        this.description = event.target.value;
    }

    redireccionar() {
        this.setState({
            redirect: true,
        });
    }

    render() {
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
                {
                    this.state.error ? <div className="error-box">Ocurrio un error</div> : null     //SI HAY UN ERROR CARGADO EN EL ESTADO APARECE UN DIV CON EL MENSAJE OCURRIO UN ERROR
                }
                <li>
                <label htmlFor="name">nombre</label>
                <input onChange={this.guardarName} type="text" name='name' id='name' />   {/* CADA VEZ QUE HAYA UN CAMBIO SE GUARDA EN EL ESTADO */}
                </li>
                <li>
                <label htmlFor="description">descripcion</label>
                <input onChange={this.guardarDescription} type="text" name='description' id='description' />
                </li>
                <li><button onClick={this.crearTarea}>agregar</button></li>     {/* SI SE HACE CLICK EN EL BOTON EJECUTA EL FECTCH */}
            </ul>
        );
    }



};

module.exports = Alta;