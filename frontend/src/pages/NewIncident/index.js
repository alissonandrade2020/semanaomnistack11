import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import "./styles.css";

import api from "../../services/api";
import logoImg from "../../assets/ads.png";

function NewIncident() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const history = useHistory();

  const ongId = localStorage.getItem("ong_id");

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    };

    try {
      await api.post("incidents", data, {
        headers: {
          authorization: ongId
        }
      });

      history.push("/profile");
    } catch (err) {
      alert("Erro ao cadastrar Empresa, tente novamente.");
    }
  }

  const logo2 = 'https://alissonandradesistema.000webhostapp.com/img/heroes.png';

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logo2} alt="Alisson de Andrade" />

          <h1>Cadastrar nova empresas</h1>
          <p>
           Descreva o perfil da sua empresa, fale um pouco sobre o setor, e como ela funciona.
          </p>

          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Empresa"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            placeholder="Quantidade de Pessoas"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewIncident;
