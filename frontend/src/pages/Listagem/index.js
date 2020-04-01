import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import api from "../../services/api";
import logoImg from "../../assets/ads.png";

import "./styles.css";

function Listagem() {
  const [ongs, setOngs] = useState([]);

  const ongId = localStorage.getItem("ong_id");
  const ongName = localStorage.getItem("ong_name");

  const history = useHistory();

  useEffect(() => {
    api
      .get("ongs", {
        headers: {
          authorization: ongId
        }
      })
      .then(response => {
        setOngs(response.data);
      });
  }, [ongId]);

  async function handleDeleteOngs(id) {
    try {
      await api.delete(`ongs/${id}`, {
        headers: {
          authorization: ongId
        }
      });

      setOngs(ongs.filter(ong => ong.id !== id));
    } catch (err) {
      alert("Erro ao deletar usuário, tente novamente.");
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

        <Link className="button" to="/register">
          Cadastrar novo usuário
        </Link>

        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Total de usuários cadastros:</h1>

      <ul>
        {ongs.map(ong => (
          <li key={ongs.id}>
            <strong>Empresa:</strong>
            <p>{ongs.name}</p>

            <strong>E-mail:</strong>
            <p>{ongs.email}</p>

            <strong>WhatsApp:</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                
              }).format(ongs.whatsapp)}
            </p>

            <strong>Cidade:</strong>
            <p>{ongs.city}</p>

            
            <strong>Estado:</strong>
            <p>{ongs.uf}</p>

            <button
              onClick={() => handleDeleteOngs(ong.id)}
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

export default Listagem;
