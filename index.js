const express = require('express');
const authRoutes = require('./routes/auth');
const stripeRoutes = require('./routes/stripe')
const app = express();
const cors = require('cors');

const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
    'Authorization',
  ],
};

app.use(cors(corsOpts));

const authenticateToken = require('./middleware/authMiddleware')

app.use(express.json());

// Use the auth routes
app.use('/api/auth', authRoutes);

app.use('/api/auth', authenticateToken, stripeRoutes)

app.get('/api/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
