import React from "react";
import { Link } from "react-router-dom";
import Api from "../servicios/api";

class Crear extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      correo: "",
      errores: [],
    };
  }
  cambioValor = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ state, errores: [] });
  };
  verificarError(elemento) {
    return this.state.errores.indexOf(elemento) !== -1;
  }
  enviarDatos = (e) => {
    e.preventDefault();
    const { nombre, correo } = this.state;
    console.log({ nombre, correo });
    var errores = [];
    if (!nombre) errores.push("error_nombre");
    if (!correo) errores.push("error_correo");
    this.setState({ errores: errores });
    if (errores.length > 0) return false;
    var datosEnviar = { nombre: nombre, correo: correo };
    fetch(Api + "?insertar=1", {
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
  render() {
    const { nombre, correo } = this.state;
    return (
      <div className="card">
        <div className="card-header">Crear Empleado</div>
        <div className="card-body">
          <form onSubmit={this.enviarDatos}>
            <div className="mb-3">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                name="nombre"
                onChange={this.cambioValor}
                value={nombre}
                className={
                  (this.verificarError("error_nombre") ? "is-invalid" : "") +
                  " form-control"
                }
                id="nombre"
                placeholder="Nombre"
                aria-describedby=""
              />
              <small id="helpId" className="invalid-feedback">
                Escribe el nombre del empleado
              </small>
            </div>
            <div className="mb-3 mt-2">
              <label htmlFor="correo">Correo</label>
              <input
                type="email"
                name="correo"
                onChange={this.cambioValor}
                value={correo}
                className={
                  (this.verificarError("error_correo") ? "is-invalid" : "") +
                  " form-control"
                }
                id="correo"
                placeholder="Correo"
                aria-describedby=""
              />
              <small id="helpId" className="invalid-feedback">
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
                  Registrar
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

export default Crear;
