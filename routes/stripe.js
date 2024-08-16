const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET); // Your Stripe secret key

const router = express.Router();

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET;

// Login API
router.post('/charge', async (req, res) => {
  const { email, amount } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Product sample',
            },
            unit_amount: amount, // Amount in cents ($20.00)
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      mode: 'payment',
      success_url: process.env.FRONTEND_URL + process.env.FRONTEND_SUCCESS_URL,
      cancel_url: process.env.FRONTEND_URL + process.env.FRONTEND_SUCCESS_URL,
    });

    res.status(200).json({ id: session.id });

    // Generate JWT token
    

    //res.json({ message: 'Login successful', data: { user: user, token: token } });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

module.exports = router;
