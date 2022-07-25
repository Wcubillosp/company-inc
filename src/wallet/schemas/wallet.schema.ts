import { Schema } from 'mongoose';

export const WalletSchema = new Schema({
  userID: { type: String, required: true },
  balanceUSD: Number,
  balanceCOP: Number,
  createdAt: Date,
});
