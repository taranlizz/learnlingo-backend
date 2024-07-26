import { Schema, model } from 'mongoose';
import { handleSaveError, preUpdate } from './hooks.js';

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const typesList = ['teacher', 'student'];

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
      required: true,
    },
    type: {
      type: String,
      enum: typesList,
      required: true,
    },
    token: {
      type: String,
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
