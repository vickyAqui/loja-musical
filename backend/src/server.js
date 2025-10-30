const express = require('express');
const cors = require('cors');
const connection = require('./config/db');
const instrumentosRoutes = require('./routes/instrumentosRoutes');
const clientesRoutes = require('./routes/clientesRoutes');
const { router: authRoutes } = require('./routes/authRoutes');
const carrinhoRoutes = require('./routes/carrinhoRoutes');
const pedidosRoutes = require('./routes/pedidosRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/instrumentos', instrumentosRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/carrinho', carrinhoRoutes);
app.use('/api/pedidos', pedidosRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API Loja Musical - Servidor funcionando!' });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
