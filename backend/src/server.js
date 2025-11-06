require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connection = require('./config/db');
const instrumentosRoutes = require('./routes/instrumentosRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/instrumentos', instrumentosRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
