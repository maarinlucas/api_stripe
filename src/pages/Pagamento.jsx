import "./Pages.css";// Arquivo CSS para os estilos

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51Pxhv3P2C9v6ddNVKiUXCthna9ecZkjsZMnLmBo7lZrm29KqOgTm6nrsON6MRafJPVSF12L6csF2jf3NgXLAPP9R003mLZ9xCF"); //pk_live_51Pxhv3P2C9v6ddNVxAdPebNjJujD6vxFBRtjLl8yrFASXo8yJ16GyfPVUT5g9YaxAix8B3EFKbiRgXciUmHJXnme00t2VB70Zy
// chave pública

// 4000000760000002
// cartao teste

// batalhadoss94@gmail.com
// email teste

const Pagamento = () => {


  // eslint-disable-next-line no-undef
  const PORT = process.env.PORT || 5000;

  const pagar = async () => {
    alert("Aguarde, você será direcionado à página de pagamentos. Após isso poderá se cadastrar.");
    try {
      const response = await fetch(
        `http://localhost:${PORT}/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: 100 }),
        }
      );
  
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
