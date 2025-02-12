import bcryptjs from 'bcryptjs';
import mongoose, { Document } from 'mongoose';

import logger from '../bin/utils/logger';


interface IUser extends Document {
  email: string;
  password: string;
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
  }
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  if (!candidatePassword) {
    throw new Error('Password is required');
  }
  try {
    return await bcryptjs.compare(candidatePassword, this.password as string);
  } catch (error: unknown) {
    logger.error(String(error));
    throw new Error('Password comparison failed');
  }
}

const User = mongoose.model<IUser>('User', userSchema);
export default User;
