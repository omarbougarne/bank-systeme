import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Bank } from "src/bank/schema/bank.schema";
import { Document, Types } from 'mongoose';
import { type } from "os";
import { Account } from "src/account/schema/account.schema";

@Schema({
    timestamps: true
})

export class Customer extends Document {


    @Prop({ required: false })
    customerName: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true, unique: true })
    phone: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Account' }] })
    accountNumber: Account;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Bank' }] })
    bank: Bank


}

export const CustomerSchema = SchemaFactory.createForClass(Customer)