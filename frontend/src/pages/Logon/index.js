import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { IoMdWarning } from "react-icons/io";

import api from "../../services/api";

import "./styles.css";

import logo from "../../assets/ads.png";
import heroesImg from "../../assets/heroes.png";

function Logon() {
  const [id, setId] = useState("");

  const history = useHistory();

  async function handleLogon(e) {
    e.preventDefault();

    try {
      const response = await api.post("sessions", { id });

      localStorage.setItem("ong_id", id);
      localStorage.setItem("ong_name", response.data.name);

      history.push("/profile");
    } catch (err) {
      alert("Falha no login, tente novamente.");
    }
  }

  const logo = 'https://alissonandradesistema.000webhostapp.com/img/ads.png';
    
  const logo2 = 'https://alissonandradesistema.000webhostapp.com/img/heroes.png';
    
  return (
    <div className="logon-container">
         <section className="form">
          <img src={logo} alt="Logo"/>

          <h4>Desenvolvido Por: ALISSON DE ANDRADE ARAÚJO</h4>

          <form onSubmit={handleLogon}>
            <h1>Faça seu logon</h1>

            <input
              placeholder="Sua ID"
              value={id}
              onChange={e => setId(e.target.value)}
            />
            <button className="button" type="submit">
              Entrar
            </button>

            <Link to="/register" className="back-link">
              <FiLogIn size={16} color="#E02041" />
              Não tenho cadastro
            </Link>

            <Link to="/Administrador" className="back-link">
              <IoMdWarning size={16} color="yellow" />
             Acesso do Administrador
            </Link>
           
          </form>
        </section>

        <img src={logo2} alt="Heroes" />
      </div>    
  );
}

export default Logon;
