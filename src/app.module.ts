import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModule } from './customer/customer.module';
import { BankModule } from './bank/bank.module';
import { AccountModule } from './account/account.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),
  MongooseModule.forRoot(process.env.DB_URI), CustomerModule, BankModule, AccountModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
