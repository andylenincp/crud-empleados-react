import React from "react";
import { Link } from "react-router-dom";
import Api from "../servicios/api";

class Listar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datosCargados: false,
      empleados: [],
    };
  }
  borrarRegistros = (id) => {
    fetch(Api + "?borrar=" + id)
      .then((respuesta) => respuesta.json())
      .then((datosRespuesta) => {
        console.log(datosRespuesta);
        this.cargarDatos();
      })
      .catch(console.log);
  };
  cargarDatos() {
    //fetch("https://jsonplaceholder.typicode.com/users")
    fetch(Api)
      .then((respuesta) => respuesta.json())
      .then((datosRespuesta) => {
        console.log(datosRespuesta);
        this.setState({
          datosCargados: true,
          empleados: datosRespuesta,
        });
      })
      .catch(console.log);
  }
  componentDidMount() {
    this.cargarDatos();
  }
  render() {
    const { datosCargados, empleados } = this.state;
    if (!datosCargados) {
      return <div>Cargando...</div>;
    } else {
      return (
        <div className="card">
          <div className="card-header">
            <Link className="btn btn-outline-dark btn-sm" to={"/crear"}>
              Nuevo registro
            </Link>
          </div>
          <div className="card-body">
            <h4>Lista de empleados </h4>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {empleados.map((empleado) => (
                    <tr key={empleado.id}>
                      <th scope="row">{empleado.id}</th>
                      <td>{empleado.nombre}</td>
                      <td>{empleado.correo}</td>
                      <td>
                        <div className="btn-group" role="group" aria-label="">
                          <Link
                            className="btn btn-primary"
                            to={"/editar/" + empleado.id}
                          >
                            Editar
                          </Link>
                          <button
                            type="button"
                            className="btn btn-danger ms-2"
                            onClick={() => this.borrarRegistros(empleado.id)}
                          >
                            Borrar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Listar;
