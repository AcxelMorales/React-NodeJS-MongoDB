import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import Swal from "sweetalert2";

import clienteAxios from "../config/axios";

const Cita = props => {
  const { cita } = props;

  if (!cita[0]) {
    props.history.push("/");
    return null;
  }

  const eliminarCita = id => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Los cambios no se pueden revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then(result => {
      if (result.value) {
        Swal.fire("Eliminado!", "La cita ah sido eliminada.", "success");

        clienteAxios
          .delete(`/pacientes/${id}`)
          .then(() => {
            props.setConsultar(true);
            props.history.push("/");
          })
          .catch(console.error);
      }
    });
  };

  return (
    <Fragment>
      <h1 className="my-5">Cita de {cita[0].nombre}</h1>
      <div className="container mt-5 py-5">
        <div className="row">
          <div className="col-12 mb-5 d-flex justify-content-center">
            <Link
              to={"/"}
              className="btn btn-success text-uppercase py-2 px-5 font-weight-bold"
            >
              Volver
            </Link>
          </div>

          <div className="col-md-8 mx-auto">
            <div className="list-group">
              <div className="p-5 list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between mb-4">
                  <h3 className="mb-3">{cita[0].nombre}</h3>
                  <small className="fecha-alta">
                    {cita[0].fecha} - {cita[0].hora}
                  </small>
                </div>
                <p className="mb-0">{cita[0].sintomas}</p>
                <div className="contacto py-3">
                  <p>Dueño: {cita[0].propietario}</p>
                  <p>Teléfono: {cita[0].telefono}</p>
                </div>
                <div className="d-flex">
                  <button
                    type="button"
                    className="text-uppercase py-2 px-5 font-weight-bold btn btn-danger col"
                    onClick={() => eliminarCita(cita[0]._id)}
                  >
                    Eliminar &times;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(Cita);
