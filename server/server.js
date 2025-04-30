const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.js'); // Import the routes
const ledgerRoute = require('./routes/ledgerRoute.js');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000', // Allow only the frontend URL
  credentials: true, // Allow credentials
}));

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Use the routes from routes.js
app.use('/api/', authRoutes);
app.use('/api/', ledgerRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
