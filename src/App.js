import { useState } from "react";
import "./App.css";

import Button from "react-bootstrap/Button";
import ButtonHackthon from "./ButtonHackthon.js";
import TakenBy from "./TakenBy.js";
import EnvTdWrapper from "./EnvTdWrapper";
import Modal from "react-bootstrap/Modal";

function App() {
  const services = ["linrest", "sensors"];
  const [selectedEnvs, setSelectedEnvs] = useState({
    "dev-01": true,
    "dev-02": false,
    "dev-03": false,
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const envsNames = ["dev-01", "dev-02", "dev-03"];

  const envs = {
    "dev-01": {
      linrest: {
        tag: "example linrest dev-01",
        deployer: "Itzik",
        status: "Healthy",
      },
      sensors: {
        tag: "example sensors dev-01",
        deployer: "Moshe",
        status: "Healthy",
      },
    },
    "dev-02": {
      linrest: {
        tag: "example linrest dev-02",
        deployer: "Berg",
        status: "Healthy",
      },
      sensors: {
        tag: "example branch dev-02",
        deployer: "Avi Meller",
        status: "Starting Up",
      },
    },
    "dev-03": {
      linrest: {
        tag: "example linrest dev-03",
        deployer: "Itzik",
        status: "Healthy",
      },
      sensors: {
        tag: "example branch dev-03",
        deployer: "Alon",
        status: "UnHealthy",
      },
    },
  };

  const generateTexts = (serviceName, field) => {
    const elements = [];
    const keys = Object.keys(selectedEnvs);
    var enabledEnvs = keys.filter(function (key) {
      return selectedEnvs[key];
    });

    for (const env of enabledEnvs) {
      elements.push(<EnvTdWrapper envName={env} component={<p>{envs[env][serviceName][field]}</p>} />);
    }

    return elements;
  };

  const generateButtons = (serviceName) => {
    const elements = [];
    const keys = Object.keys(selectedEnvs);
    var enabledEnvs = keys.filter(function (key) {
      return selectedEnvs[key];
    });

    for (const env of enabledEnvs) {
      elements.push(<ButtonHackthon env={env} />);
    }

    return elements;
  };

  const handleChange = (item) => {
    const envName = item.target.value;
    const backup = { ...selectedEnvs };
    backup[envName] = !selectedEnvs[envName];
    setSelectedEnvs(backup);
    console.log(selectedEnvs);
  };

  const generateRows = (services) => {
    return services.map((serviceName) => {
      return (
        <tr>
          <th scope="row">
            <span className="first-letter">{serviceName}</span>
          </th>
          <td>
            <div>{generateTexts(serviceName, "tag")}</div>
          </td>
          <td>
            <div>{generateTexts(serviceName, "deployer")}</div>
          </td>
          <td>
            <div>{generateTexts(serviceName, "status")}</div>
          </td>
          <td>
            <div>{generateButtons(serviceName)}</div>
          </td>
        </tr>
      );
    });
  };

  const generateEnvsChecks = (envsNames) => {
    return envsNames.map((env) => {
      return (
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value={env}
            id="flexCheckDefault1"
            onChange={handleChange}
            checked={selectedEnvs[env] === true}
          />
          <label className="form-check-label" for="flexCheckDefault1">
            {env.toUpperCase()}
          </label>
        </div>
      );
    });
  };

  return (
    <div className="App">
      <h1>Super cool Environment manager 🤸‍♀️😄</h1>
      <div className="select-env">
        <h3>Select Envs</h3>
        <div className="envs-container">{generateEnvsChecks(envsNames)}</div>
      </div>
      <table className="table mt-2">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tag / Branch</th>
            <th scope="col">Deployer</th>
            <th scope="col">Status</th>
            <th scope="col">Taken By</th>
          </tr>
        </thead>
        <tbody>{generateRows(services)}</tbody>
      </table>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
