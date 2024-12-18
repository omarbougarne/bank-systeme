import { Module } from '@nestjs/common';
import { BankController } from './bank.controller';
import { BankService } from './bank.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BankSchema } from './schema/bank.schema';
import { CustomerSchema } from 'src/customer/schema/customer.schema';
import { AccountSchema } from 'src/account/schema/account.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Bank', schema: BankSchema }, { name: 'Customer', schema: CustomerSchema }, { name: 'Account', schema: AccountSchema }])],
  controllers: [BankController],
  providers: [BankService]
})
export class BankModule { }
