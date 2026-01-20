import express from 'express';
import Testimonial from '../models/Testimonial.js';

const router = express.Router();

// Get all testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a testimonial
router.post('/', async (req, res) => {
  try {
    const { image } = req.body;
    const testimonial = new Testimonial({ image });
    await testimonial.save();
    res.json(testimonial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a testimonial
router.delete('/:id', async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
