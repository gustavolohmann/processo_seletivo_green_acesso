require('dotenv').config()
const db = require('./db');
const express = require('express');
const app = express();

const swaggerSetup = require('./swagger');
app.use(express.json());
swaggerSetup(app);

const boletoRouter = require('./routes/boleto.js');
const importRouter = require('./routes/import');
const loteRouter = require('./routes/lote');

app.use('/boleto', boletoRouter);
app.use('/document', importRouter);
app.use('/lote', loteRouter);
const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});