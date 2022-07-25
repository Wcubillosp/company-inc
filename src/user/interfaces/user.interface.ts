import { Document } from 'mongoose';

export interface User extends Document {
  email: { type: string; required: true };
  password: string;
  fullName: string;
  cedula: string;
  direccion: string;
  readonly createdAt: Date;
}
