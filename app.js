const express = require('express');
const connectDB = require('./database/db');
const ruleRoutes = require('./routes/ruleRoutes');

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(express.static('public')); // Serve static files

// Connect Database
connectDB();

// Use routes
app.use('/api/rules', ruleRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Handle 404 for undefined routes
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Server setup
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});







