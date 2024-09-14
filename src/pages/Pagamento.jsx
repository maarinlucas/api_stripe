// eslint-disable-next-line no-unused-vars
import React from "react";
import "./Pages.css";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_live_51Pxhv3P2C9v6ddNVxAdPebNjJujD6vxFBRtjLl8yrFASXo8yJ16GyfPVUT5g9YaxAix8B3EFKbiRgXciUmHJXnme00t2VB70Zy");

const Pagamento = () => {
  const pagar = async () => {
    alert("Aguarde, você será direcionado à página de pagamentos. Após isso, você poderá se cadastrar.");
    try {
      const response = await fetch("https://scheckout-997eb.web.app/create-checkout-session", { // Atualize para a URL de produção do backend
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 100 }), // Valor do pagamento em centavos
      });
  
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Resposta não está no formato JSON");
      }
  
      const { id } = await response.json();
  
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId: id });
  
      if (error) {
        console.error(error);
      }
  
    } catch (error) {
      alert("Erro ao realizar o pagamento: " + error.message);
    }
  };

  return (
    <div className="container">
      <button className="btn" onClick={pagar}>
        Ir para o Checkout
      </button>

      <p className="copy">© 2024 BatalhaDoS. Todos os direitos reservados.</p>
    </div>
  );
};

export default Pagamento;
