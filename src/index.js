require('dotenv').config();
const express = require('express');
const webhookRoutes = require('./routes/webhookRoutes');

const app = express();
app.use(express.json());

app.use('/webhook', webhookRoutes); 

const PORT = 3000;
app.listen( PORT, () => 
    {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    }
);