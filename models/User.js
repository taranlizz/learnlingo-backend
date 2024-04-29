import { Schema, model } from 'mongoose';
import { handleSaveError, preUpdate } from './hooks.js';

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegex,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minLength: 8,
      match: passwordRegex,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleSaveError);

userSchema.pre('findOneAndUpdate', preUpdate);
userSchema.post('findOneAndUpdate', handleSaveError);

const User = model('user', userSchema);

export default User;
