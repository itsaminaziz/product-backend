import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: String,
  likes: Number,
  neutral: Number,
  dislikes: Number,
  image: String
});

const CommentSchema = new mongoose.Schema({
  text: String,
  author: String
});


const FaqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  items: [ItemSchema],
  comments: [CommentSchema],
  faqs: [FaqSchema],
});

export default mongoose.model('Product', ProductSchema);
