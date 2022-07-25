import {
  Controller,
  Post,
  Get,
  Put,
  Res,
  HttpStatus,
  Body,
  NotFoundException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateWalletDTO } from './dto/wallet.dto';
import { WalletService } from './wallet.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Post('/create')
  async createWallet(@Res() res, @Req() request) {
    const createWalletDTO: CreateWalletDTO = {
      userID: request.user.userID,
      balanceUSD: 0,
      balanceCOP: 0,
    };
    const getWallet = await this.walletService.getWallet(request.user.userID);
    if (getWallet) throw new NotFoundException('Wallet exists');
    const wallet = await this.walletService.createWallet(createWalletDTO);
    return res.status(HttpStatus.OK).json(wallet);
  }

  @Get('/wallet')
  async getWallet(@Res() res, @Req() request) {
    const wallet = await this.walletService.getWallet(request.user.userID);
    if (!wallet) throw new NotFoundException('Wallet Does not exists');
    return res.status(HttpStatus.OK).json(wallet);
  }

  @Put('/recharge')
  async updateWallet(
    @Res() res,
    @Req() request,
    @Body() createWalletDTO: CreateWalletDTO,
  ) {
    const updateWallet = await this.walletService.updateWallet(
      request.user.userID,
      createWalletDTO,
    );
    if (!updateWallet) throw new NotFoundException('Wallet Does not exists');
    return res.status(HttpStatus.OK).json(updateWallet);
  }
}
