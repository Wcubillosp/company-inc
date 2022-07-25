import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet } from './interfaces/wallet.interface';
import { CreateWalletDTO } from './dto/wallet.dto';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel('Wallet') private readonly walletModel: Model<Wallet>,
  ) {}

  async getWallet(userID: string): Promise<Wallet> {
    const wallets = await this.walletModel.findOne({ userID });
    return wallets;
  }

  async createWallet(createWalletDTO: CreateWalletDTO): Promise<Wallet> {
    const newWallet = new this.walletModel(createWalletDTO);
    return await newWallet.save();
  }

  async updateWallet(
    userID: string,
    createWalletDTO: CreateWalletDTO,
  ): Promise<Wallet> {
    const query = { userID: userID };
    const upWallet = await this.walletModel.findOneAndUpdate(
      query,
      createWalletDTO,
      { new: true },
    );
    return upWallet;
  }
}
