import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types } from 'mongoose';
import { type } from "os";
import { Account } from "src/account/schema/account.schema";
import { Customer } from "src/customer/schema/customer.schema";

@Schema({
    timestamps: true
})

export class Bank {


    @Prop({ required: false })
    bankName: string;

    @Prop({ type: Types.ObjectId, ref: 'Customer' })
    customerDetails: Customer[]





}

export const BankSchema = SchemaFactory.createForClass(Bank)