const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const dishRoutes = require('./routes/dishes');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.RESTAURANT_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Database Connected Successfully'))
    .catch((err) => console.error('Database Connection Error:', err));

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Route Handlers
app.use('/user', userRoutes);
app.use('/dishes', dishRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'Arise, My Shadow Soldiers',
        path: req.path,
        method: req.method,
    });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});