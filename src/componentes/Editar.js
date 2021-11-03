import React from "react";
import { Link } from "react-router-dom";
import Api from "../servicios/api";

class Editar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datosCargados: false,
      empleado: [],
    };
  }
  cambioValor = (e) => {
    const state = this.state.empleado;
    state[e.target.name] = e.target.value;
    this.setState({ empleado: state });
  };
  enviarDatos = (e) => {
    e.preventDefault();
    const { id, nombre, correo } = this.state.empleado;
    console.log({ id, nombre, correo });
    var datosEnviar = { id: id, nombre: nombre, correo: correo };
    fetch(Api + "?actualizar=1", {
      method: "POST",
      body: JSON.stringify(datosEnviar),
    })
      .then((respuesta) => respuesta.json())
      .then((datosRespuesta) => {
        console.log(datosRespuesta);
        this.props.history.push("/");
      })
      .catch(console.log);
  };
  componentDidMount() {
    console.log(this.props.match.params.id);
    fetch(
      "http://localhost/api-empleados/?consultar=" + this.props.match.params.id
    )
      .then((respuesta) => respuesta.json())
      .then((datosRespuesta) => {
        console.log(datosRespuesta);
        this.setState({
          datosCargados: true,
          empleado: datosRespuesta[0],
        });
      })
      .catch(console.log);
  }
  render() {
    const { datosCargados, empleado } = this.state;
    if (!datosCargados) {
      return <div>Cargando...</div>;
    } else {
      return (
        <div className="card">
          <div className="card-header">Editar Empleado</div>
          <div className="card-body">
            <form onSubmit={this.enviarDatos}>
              <div className="mb-3">
                <label htmlFor="id" className="form-label">
                  Identificador:
                </label>
                <input
                  type="text"
                  readOnly
                  disabled
                  className="form-control"
                  id="id"
                  name="id"
                  value={empleado.id}
                  onChange={this.cambioValor}
                />
                <small id="helpId" className="text-muted">
                  Identificador del registro a actualizar
                </small>
              </div>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  id="nombre"
                  placeholder="Nombre"
                  aria-describedby=""
                  onChange={this.cambioValor}
                  value={empleado.nombre}
                  required
                />
                <small id="helpId" className="text-muted">
                  Escribe el nombre del empleado
                </small>
              </div>
              <div className="mb-3 mt-2">
                <label htmlFor="correo" className="form-label">
                  Correo
                </label>
                <input
                  type="email"
                  name="correo"
                  className="form-control"
                  id="correo"
                  placeholder="Correo"
                  aria-describedby=""
                  onChange={this.cambioValor}
                  value={empleado.correo}
                  required
                />
                <small id="helpId" className="text-muted">
                  Escribe el correo del empleado
                </small>
              </div>
              <div
                className="btn-toolbar"
                role="toolbar"
                aria-label="Toolbar with button groups"
              >
                <div
                  className="btn-group mr-2 mt-4"
                  role="group"
                  aria-label="First group"
                >
                  <button type="submit" className="btn btn-success">
                    Actualizar
                  </button>
                  <Link to={"/"} className="btn btn-secondary ms-2">
                    Cancelar
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}

export default Editar;
