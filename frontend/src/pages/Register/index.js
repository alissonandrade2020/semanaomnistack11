import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";
import "./styles.css";

import logoImg from "../../assets/ads.png";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    };

    try {
      const response = await api.post("ongs", data);

      alert(`Seu ID de acesso: ${response.data.id}`);

      localStorage.setItem("ong_id", response.data.id);
      localStorage.setItem("ong_name", name);

      history.push("/profile");
    } catch (err) {
      alert("Erro no cadastro, tente novamente.");
    }
  }

  const logo2 = 'https://alissonandradesistema.000webhostapp.com/img/heroes.png';

  return (
    
      <div className="register-container">
        <div className="content">
          <section>
            <img src={logo2} alt="Alisson de Andrade" />

            <h1>Cadastro de Empresas</h1>
            <p>
              Faça seu cadastro, entre na plataforma e ajude pessoas a
              encontrarem as empresas.
            </p>

            <Link to="/" className="back-link">
              <FiArrowLeft size={16} color="#E02041" />
              Não tenho cadastro
            </Link>
          </section>

          <form onSubmit={handleRegister}>
            <input
              placeholder="Nome da sua Empresa"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              placeholder="Whatsapp"
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
            />

            <div className="input-group">
              <input
                placeholder="cidade"
                value={city}
                onChange={e => setCity(e.target.value)}
              />
              <input
                placeholder="UF"
                style={{ width: 80 }}
                value={uf}
                onChange={e => setUf(e.target.value)}
              />
            </div>

            <button className="button" type="submit">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    
  );
}

export default Register;
