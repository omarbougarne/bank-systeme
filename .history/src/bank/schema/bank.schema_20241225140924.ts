import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types } from 'mongoose';
import { Account } from "src/account/schema/account.schema";
import { Customer } from "src/customer/schema/customer.schema";

Schema({
    timestamps: true
})
export class Bank {


    @Prop({})
    bankName: string

    // @Prop({})
    // lonDetails: string;

    // @Prop({ unique: true })
    // transNo: string;

    // @Prop({})
    // transDate: Date;

    // @Prop({})
    // transTime: Date;

    @Prop({})
    customerD: string[];



}

export const BankSchema = SchemaFactory.createForClass(Bank);