import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountSchema } from './schema/account.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }])],
  providers: [AccountService]
})
export class AccountModule { }
