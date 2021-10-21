import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { validateId, getbirthdate } from "../services/helpers";

const Create = () => {
  const [employee, setemployee] = useState({
    first_name: "",
    last_name: "",
    email: "",
    personal_id: "",
    inss: "",
    birth: "",
  });

  const baseUrl = process.env.REACT_APP_BACKEND_URL;

  const history = useHistory();

  const backbutton = (e) => {
    e.preventDefault();
    history.push("/");
  };

  const onChange = (e) => {
    setemployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const validateInputs = () => {
    if (!validateId(employee.personal_id)) {
      alert("Ingrese una cedula valida");
      return;
    } else if (
      employee.first_name === "" ||
      employee.last_name === "" ||
      employee.email === "" ||
      employee.personal_id === "" ||
      employee.inss === ""
    ) {
      alert("Todos los campos son necesarios");
      return;
    }

    getbirthdate(employee);
  };

  const postApi = async () => {
    if (employee.birth === "") {
      getbirthdate(employee);
    }
    const response = await axios
      .post(`${baseUrl}/api/employees/`, employee)
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          alert("Registro duplicado o erroneo");
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          alert("Registro duplicado o erroneo");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
          alert("Registro duplicado o erroneo");
        }
      });

    if (response) {
      history.push("/");
    }
  };

  const formsubmit = (e) => {
    e.preventDefault();
    validateInputs();
    postApi();
  };

  return (
    <Fragment>
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="mt-3">Crear Nuevo Empleado</h1>
        <button
          type="button"
          className="btn btn-primary mt-2"
          onClick={backbutton}
        >
          Regresar
        </button>
      </div>

      <div className="container mt-5">
        <form onSubmit={formsubmit}>
          <div className="mb-3">
            <label htmlFor="first_name" className="form-label">
              Nombres
            </label>
            <input
              onChange={onChange}
              name="first_name"
              type="text"
              className="form-control"
              id="first_name"
              required
              value={employee.first_name}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="last_name" className="form-label">
              Apellidos
            </label>
            <input
              onChange={onChange}
              name="last_name"
              type="text"
              className="form-control"
              id="last_name"
              required
              value={employee.last_name}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo
            </label>
            <input
              onChange={onChange}
              name="email"
              type="Email"
              className="form-control"
              id="email"
              required
              placeholder="correo@dominio.com"
              value={employee.email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="personal_id" className="form-label">
              Cedula
            </label>
            <input
              onChange={onChange}
              name="personal_id"
              type="text"
              className="form-control"
              id="personal_id"
              required
              placeholder="000-000000-0000A"
              value={employee.personal_id}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inss" className="form-label">
              Numero INSS
            </label>
            <input
              onChange={onChange}
              name="inss"
              type="number"
              className="form-control"
              id="inss"
              required
              value={employee.inss}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Create;
