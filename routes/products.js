import express from 'express';
import Product from '../models/Product.js';
const router = express.Router();

import { getProductFaqs, addProductFaq, updateProductFaq, deleteProductFaq } from '../controllers/productController.js';
router.get('/:id/faqs', getProductFaqs);
router.post('/:id/faqs', addProductFaq);
router.put('/:id/faqs/:faqId', updateProductFaq);
router.delete('/:id/faqs/:faqId', deleteProductFaq);

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single product by name
router.get('/:name', async (req, res) => {
  try {
    const product = await Product.findOne({ name: req.params.name });
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create or update product
router.post('/', async (req, res) => {
  try {
    const { name, image, items, comments } = req.body;
    let product = await Product.findOne({ name });
    if (product) {
      product.image = image;
      product.items = items;
      product.comments = comments;
      await product.save();
    } else {
      product = new Product({ name, image, items, comments });
      await product.save();
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete product
router.delete('/:name', async (req, res) => {
  try {
    await Product.deleteOne({ name: req.params.name });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
