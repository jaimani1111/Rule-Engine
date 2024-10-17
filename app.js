const express = require('express');
const connectDB = require('./database/db');
const ruleRoutes = require('./routes/ruleRoutes');

const app = express();


app.use(express.json());
app.use(express.static('public')); // Serve static files


connectDB();

// Use routes
app.use('/api/rules', ruleRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});







