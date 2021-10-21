import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Main = () => {
  const [employees, setemployees] = useState([]);
  const history = useHistory();
  const baseUrl = process.env.REACT_APP_BACKEND_URL;

  const getEmployees = async () => {
    const data = await axios.get(`${baseUrl}/api/employees`);
    setemployees(data.data);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const createbutton = (e) => {
    e.preventDefault();
    history.push("/nuevo");
  };

  const deleteApi = async (id) => {
    const response = await axios
      .delete(`${baseUrl}/api/employees/${id}`)
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          alert("Ha corrido un error porfavor intente nuevamente");
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          alert("Ha corrido un error porfavor intente nuevamente");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
          alert("Ha corrido un error porfavor intente nuevamente");
        }
      });

    if (response) {
      history.go(0);
    }
  };

  const deletebutton = (e) => {
    e.preventDefault();

    let res = confirm("Esta seguro que desea eliminar al usuario?");

    if (res) {
      deleteApi(e.target.id);
    } else {
      return;
    }
  };

  const updatebutton = (e) => {
    e.preventDefault();
    history.push(`/${e.target.id}/editar`);
  };

  return (
    <Fragment>
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="mt-3">Listado de empleados</h1>
        <button
          type="button"
          className="btn btn-primary mt-2"
          onClick={createbutton}
        >
          Crear nuevo
        </button>
      </div>

      {employees.length === 0 ? (
        <div className="container-xxl mt-5 text-center">
          <h2>No hay datos cargados</h2>
        </div>
      ) : (
        <div className="container-xxl mt-5">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Apellidos</th>
                <th scope="col">Correo</th>
                <th scope="col">Cedula</th>
                <th scope="col">#INSS</th>
                <th scope="col">Fecha de nacimiento</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((row) => (
                <tr key={row.id}>
                  <td>{row.first_name}</td>
                  <td>{row.last_name}</td>
                  <td>{row.email}</td>
                  <td>{row.personal_id}</td>
                  <td>{row.inss}</td>
                  <td>{row.birth}</td>
                  <td className="d-flex justify-content-between align-items-center">
                    <button
                      id={row.id}
                      onClick={updatebutton}
                      type="button"
                      className="btn btn-success"
                    >
                      Editar
                    </button>
                    <button
                      id={row.id}
                      onClick={deletebutton}
                      type="button"
                      className="btn btn-danger"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Fragment>
  );
};

export default Main;
