import { Schema, model } from 'mongoose';

const alertSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  symbol: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, enum: ['above', 'below'], required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
})

alertSchema.pre('save', function (next) {
  this.createdAt = new Date();
  this.status = 'active';
  next();
});

const Alert = model('Alert', alertSchema);
export default Alert;