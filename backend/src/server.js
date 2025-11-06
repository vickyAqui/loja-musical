require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connection = require('./config/db');
const instrumentosRoutes = require('./routes/instrumentosRoutes');
const clientesRoutes = require('./routes/clientesRoutes');
const pedidosRoutes = require('./routes/pedidosRoutes');
const avaliacoesRoutes = require('./routes/avaliacoesRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/instrumentos', instrumentosRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/avaliacoes', avaliacoesRoutes);
app.use('/api/admin', adminRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
