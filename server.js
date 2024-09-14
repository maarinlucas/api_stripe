import express from 'express'; // Uso de "import" ao invés de "require"
import cors from 'cors';       // Uso de "import" para middlewares
import Stripe from 'stripe';   // Uso de "import" para Stripe



const stripe = new Stripe('sk_test_51Pxhv3P2C9v6ddNVQ5CeFwVrzRxibG013TNDfcCckDDeDYeVTlDwwo75m2HVXxCVMUL3tD66v3okVkm6MD7IdkZg00PYENvGMh');

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
      success_url: 'http://localhost:5173/success',  // Deep Link para a página de sucesso no app
      cancel_url: 'http://localhost:5173/cancel',    // Deep Link para a página de cancelamento no app
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
