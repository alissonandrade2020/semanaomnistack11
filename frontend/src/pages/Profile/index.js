import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import api from "../../services/api";
import logoImg from "../../assets/ads.png";

import "./styles.css";

function Profile() {
  const [incidents, setIncidents] = useState([]);

  const ongId = localStorage.getItem("ong_id");
  const ongName = localStorage.getItem("ong_name");

  const history = useHistory();

  useEffect(() => {
    api
      .get("profile", {
        headers: {
          authorization: ongId
        }
      })
      .then(response => {
        setIncidents(response.data);
      });
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          authorization: ongId
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (err) {
      alert("Erro ao deletar Empresa, tente novamente.");
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push("/");
  }

  const logo2 = 'https://alissonandradesistema.000webhostapp.com/img/heroes.png';

  return (
    <div className="profile-container">
      <header>
        <img src={logo2} alt="Alisson de Andrade" />
        <span>Bem vindo, {ongName}</span>

        <Link className="button" to="/incidents/new">
          Cadastrar nova empresa
        </Link>

        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Empresas Cadastradas</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>Empresa:</strong>
            <p>{incident.title}</p>

            <strong>Descrição:</strong>
            <p>{incident.description}</p>

            <strong>Quantidades de Funcionários:</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                
              }).format(incident.value)}
            </p>

            <button
              onClick={() => handleDeleteIncident(incident.id)}
              type="button"
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
