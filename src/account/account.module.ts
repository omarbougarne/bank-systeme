import { forwardRef, Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountSchema } from './schema/account.schema';
import { AccountController } from './account.controller';
import { CustomerService } from 'src/customer/customer.service';
import { CustomerSchema } from 'src/customer/schema/customer.schema';
import { CustomerModule } from 'src/customer/customer.module';
import { SharedService } from 'src/shared/shared.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }])],
  controllers: [AccountController],
  providers: [AccountService, SharedService]
})
export class AccountModule { }
