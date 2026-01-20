import Product from '../models/Product.js';

// Add FAQ to product
export const addProductFaq = async (req, res) => {
	try {
		const { id } = req.params;
		const { question, answer } = req.body;
		if (!question || !answer) {
			return res.status(400).json({ error: 'Question and answer are required.' });
		}
		const product = await Product.findById(id);
		if (!product) {
			return res.status(404).json({ error: 'Product not found.' });
		}
		product.faqs.push({ question, answer });
		await product.save();
		res.json({ success: true, faqs: product.faqs });
	} catch (err) {
		res.status(500).json({ error: 'Unable to save FAQ — Database error.' });
	}
};

// Get FAQs for product
export const getProductFaqs = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findById(id);
		if (!product) {
			return res.status(404).json({ error: 'Product not found.' });
		}
		res.json({ success: true, faqs: product.faqs || [] });
	} catch (err) {
		res.status(500).json({ error: 'Unable to fetch FAQs — Database error.' });
	}
};

// Update FAQ in product
export const updateProductFaq = async (req, res) => {
	try {
		const { id, faqId } = req.params;
		const { question, answer } = req.body;
		const product = await Product.findById(id);
		if (!product) {
			return res.status(404).json({ error: 'Product not found.' });
		}
		const faq = product.faqs.id(faqId);
		if (!faq) {
			return res.status(404).json({ error: 'FAQ not found.' });
		}
		faq.question = question;
		faq.answer = answer;
		await product.save();
		res.json({ success: true, faqs: product.faqs });
	} catch (err) {
		res.status(500).json({ error: 'Unable to update FAQ — Database error.' });
	}
};

// Delete FAQ from product
export const deleteProductFaq = async (req, res) => {
	try {
		const { id, faqId } = req.params;
		const product = await Product.findById(id);
		if (!product) {
			return res.status(404).json({ error: 'Product not found.' });
		}
		const initialLength = product.faqs.length;
		product.faqs = product.faqs.filter(faq => faq._id?.toString() !== faqId);
		if (product.faqs.length === initialLength) {
			return res.status(404).json({ error: 'FAQ not found.' });
		}
		await product.save();
		res.json({ success: true, faqs: product.faqs });
	} catch (err) {
		res.status(500).json({ error: 'Unable to delete FAQ — Database error.' });
	}
};
