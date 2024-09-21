import dontenv from 'dotenv'
dontenv.config();
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import helmet from 'helmet';


// eslint-disable-next-line no-undef
const stripe = new Stripe(process.env.VITE_SECRET_TEST_KEY);
//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
//chave secreta


const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      fontSrc: ["'self'", "https://checkoutsjurados-e5fe3b316bd4.herokuapp.com", "https://fonts.gstatic.com"], // Adicione outros domínios se necessário
      styleSrc: ["'self'", "https://fonts.googleapis.com"], // Permita estilos de fontes do Google
      // Adicione outras diretivas conforme necessário
    }
  }
}));
app.post('/create-checkout-session', async (req, res) => {
  /* const { amount } = req.body; */

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
            // eslint-disable-next-line no-undef
            unit_amount: process.env.VITE_PRODUCT_AMOUNT,  // Valor do pagamento em centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://checkoutsjurados-e5fe3b316bd4.herokuapp.com/cadastro',
      cancel_url: 'https://checkoutsjurados-e5fe3b316bd4.herokuapp.com/cancel',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error);
    res.status(500).json({ error: 'Erro ao criar sessão de checkout' });
  }
});



// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
