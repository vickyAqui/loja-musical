const express = require('express');
const connection = require('./config/db');
const instrumentosRoutes = require('./routes/instrumentosRoutes');

const app = express();
app.use(express.json());
app.use('/api/instrumentos', instrumentosRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
