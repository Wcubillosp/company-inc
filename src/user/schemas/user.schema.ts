import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  cedula: { type: String, required: true },
  direccion: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
