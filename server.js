import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/products.js';
import testimonialRoutes from './routes/testimonials.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    // Try a simple MongoDB command
    await mongoose.connection.db.admin().ping();
    res.json({ status: 'ok', mongo: 'connected' });
  } catch (e) {
    res.status(500).json({ status: 'error', mongo: 'disconnected', error: e.message });
  }
});

app.use('/api/products', productRoutes);
app.use('/api/testimonials', testimonialRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => console.error('MongoDB connection error:', err));
