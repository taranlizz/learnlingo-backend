import { Schema, model } from 'mongoose';
import { handleSaveError, preUpdate } from './hooks.js';

export const levelsList = [
  'A1 Beginner',
  'A2 Elementary',
  'B1 Intermediate',
  'B2 Upper-Intermediate',
  'C1 Advanced',
];

const teacherSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    languages: {
      type: [String],
      required: true,
    },
    levels: {
      type: [String],
      enum: levelsList,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: [{ reviewer_name: String, reviewer_rating: Number, comment: String }],
    },
    pricePerHour: {
      type: Number,
      required: true,
      min: 0,
    },
    lessonsDone: {
      type: Number,
      required: true,
      min: 0,
    },
    lessonInfo: {
      type: String,
      required: true,
    },
    conditions: { type: [String], required: true },
    experience: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

teacherSchema.post('save', handleSaveError);

teacherSchema.pre('findOneAndUpdate', preUpdate);
teacherSchema.post('findOneAndUpdate', handleSaveError);

const Teacher = model('teacher', teacherSchema);

export default Teacher;
