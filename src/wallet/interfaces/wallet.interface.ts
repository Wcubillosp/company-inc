import { Document } from 'mongoose';

export interface Wallet extends Document {
  userID: string;
  balanceUSD: string;
  balanceCOP: string;
  readonly createdAt: Date;
}
