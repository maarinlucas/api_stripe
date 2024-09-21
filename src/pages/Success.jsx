// eslint-disable-next-line no-unused-vars
import React from "react";
/* import { useNavigate } from "react-router-dom"; */
import "./Pages.css";

const Success = () => {
  /* const navigate = useNavigate(); */

  /* const handleClick = () => {
    navigate("/", { replace: true }); // Substitui a entrada atual na pilha de histórico
  }; */

  return (
    <div className="container">
      <h1>Solicitação de cadastro em andamento...</h1>
      <p>Por favor, aguarde o contato da nossa equipe para a realização do pagamento do app para a validação do cadastro, prazo de <strong>24h</strong>.</p>
      
     {/*  <button className="btn" onClick={handleClick}>
        Voltar para a página inicial
      </button> */}
    </div>
  );
};

export default Success;