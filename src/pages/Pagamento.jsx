
// eslint-disable-next-line no-unused-vars
import React from "react";
import "./Pages.css";// Arquivo CSS para os estilos
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51Pxhv3P2C9v6ddNVKiUXCthna9ecZkjsZMnLmBo7lZrm29KqOgTm6nrsON6MRafJPVSF12L6csF2jf3NgXLAPP9R003mLZ9xCF"
); // Substitua pela sua chave pública do Stripe

const Pagamento = () => {
  const pagar = async () => {
    alert("Aguarde, você será direcionado à página de pagamentos. Após isso, você poderá se cadastrar.");
    try {
      const response = await fetch(
        "http://localhost:5000/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: 5000 }), // Valor do pagamento em centavos
        }
      );

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
