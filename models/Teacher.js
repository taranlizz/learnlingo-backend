import { Schema, model } from 'mongoose';

const teacherSchema = new Schema({
    name: String,
    surname: String,
    languages: [String],
    levels: [String],
    rating: Number,
    reviews: [{ reviewer_name: String, reviewer_rating: Number, comment: String }],
    price_per_hour: Number,
    lessons_done: Number,
    lesson_info: String,
    conditions: [String],
    experience: String,
});

const Teacher = model('teacher', teacherSchema);

export default Teacher;
