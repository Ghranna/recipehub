import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import recipeRoutes from './routes/recipeRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rutas principales
app.use('/api/recipes', recipeRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('🟢 Conectado a MongoDB');
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
})
.catch((error) => {
  console.error('❌ Error al conectar a MongoDB:', error.message);
});