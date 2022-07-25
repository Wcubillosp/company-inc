import { ApiProperty } from '@nestjs/swagger';

export class CreateNewWalletDTO {
  userID: string;
  balanceUSD: number;
  balanceCOP: number;
  readonly createdAt?: Date;
}

export class CreateWalletDTO {
  userID: string;
  @ApiProperty()
  balanceUSD: number;
  @ApiProperty()
  balanceCOP: number;
  readonly createdAt?: Date;
}
