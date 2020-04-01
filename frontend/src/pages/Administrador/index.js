import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";

import logo from "../../assets/ads.png";
import heroesImg from "../../assets/heroes.png";

function Administrador() {
  const [id, setId] = useState("");

  const history = useHistory();

  async function handleLogon(e) {
    e.preventDefault();

    try {
      const response = await api.post("sessions", { id });

      localStorage.setItem("ong_id", id);
      localStorage.setItem("ong_name", response.data.name);

      history.push("/Listagem");
    } catch (err) {
      alert("Falha no login, tente novamente.");
    }
  }

   const logo2 = 'https://alissonandradesistema.000webhostapp.com/img/heroes01.png';
    
  return (
    <div className="Administrador-container">
         <section className="form">
          <h4>Desenvolvido Por: ALISSON DE ANDRADE ARAÚJO</h4>

          <form onSubmit={handleLogon}>
            <h1>Acesso Restrito:</h1>

             <h4>Painel do Administrador</h4>
             <br>
             </br>
             <br>
             </br>

            <input
              placeholder="Digite seu acesso"
              value={id}
              onChange={e => setId(e.target.value)}
            />
            <button className="button" type="submit">
              Entrar
            </button>

            <Link to="/" className="back-link">
              <FiLogIn size={16} color="#E02041" />
              Voltar para Home
            </Link>
           
          </form>
        </section>

        <img src={logo2} alt="Heroes" />
      </div>    
  );
}

export default Administrador;
