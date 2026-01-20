import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  image: String
});

export default mongoose.model('Testimonial', TestimonialSchema);
