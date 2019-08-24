import mongoose from 'mongoose';
const { Schema } = mongoose;

const setSchema = new Schema({
  points1: Number,
  points2: Number
});

module.exports = setSchema;
