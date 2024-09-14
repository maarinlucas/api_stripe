import express from 'express'; // Uso de "import" ao invés de "require"
import cors from 'cors';       // Uso de "import" para middlewares
import Stripe from 'stripe';   // Uso de "import" para Stripe



const stripe = new Stripe('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');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  const { amount } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: 'App Sjurados - Acesso Vitalício',
            },
            unit_amount: amount,  // Valor do pagamento em centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://scheckout-997eb.web.app/success',  // Deep Link para a página de sucesso no app
      cancel_url: 'https://scheckout-997eb.web.app/cancel',    // Deep Link para a página de cancelamento no app
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
