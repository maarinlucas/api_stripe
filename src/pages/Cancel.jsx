// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from 'react-router-dom';
import "./Pages.css";


const Cancel = () => {
  // Chama useNavigate no início do componente
  const navigate = useNavigate();

  // Função para lidar com o clique do botão
  const handleGoHome = () => {
    navigate('/'); // Navega para a página inicial ou qualquer outra página desejada
  };

  return (
    <div className="container">
      <h1>Pagamento cancelado</h1>
      <p>O seu pagamento não foi completo.</p>
      <button className="btn" onClick={handleGoHome}>
        Voltar para a página inicial
      </button>
    </div>
  );
};

export default Cancel;
