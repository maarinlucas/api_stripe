// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Pages.css";

const Success = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/", { replace: true }); // Substitui a entrada atual na pilha de histórico
  };

  return (
    <div className="container">
      <h1>Cadastro Realizado com sucesso!</h1>
      <p>Verifique seu email e faça login no aplicativo.</p>
      <button className="btn" onClick={handleClick}>
        Voltar para a página inicial
      </button>
    </div>
  );
};

export default Success;