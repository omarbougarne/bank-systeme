import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Bank } from "src/bank/schema/bank.schema";
import { Types } from 'mongoose';

@Schema({
    timestamps: true
})

export class Customer {

    @Prop({ required: false })
    customerName: string;

    @Prop({ required: false, unique: false })
    accountNumber: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true, unique: true })
    phone: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Bank' }] })
    bank: Bank




}

export const CustomerSchema = SchemaFactory.createForClass(Customer)