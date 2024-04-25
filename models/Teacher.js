import { Schema, model } from 'mongoose';
import { handleSaveError } from './hooks.js';

const teacherSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    languages: {
      type: [String],
      required: true,
    },
    levels: {
      type: [String],
      enum: [
        'A1 Beginner',
        'A2 Elementary',
        'B1 Intermediate',
        'B2 Upper-Intermediate',
        'C1 Advanced',
      ],
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: [{ reviewer_name: String, reviewer_rating: Number, comment: String }],
    },
    price_per_hour: {
      type: Number,
      required: true,
    },
    lessons_done: {
      type: Number,
      required: true,
    },
    lesson_info: {
      type: String,
      required: true,
    },
    conditions: { type: [String], required: true },
    experience: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

teacherSchema.post('save', handleSaveError);

const Teacher = model('teacher', teacherSchema);

export default Teacher;
