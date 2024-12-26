import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types } from 'mongoose';
import { type } from "os";
import { Account } from "src/account/schema/account.schema";

@Schema({
    timestamps: true
})

export class Bank {


    @Prop({ required: false })
    bankName: string;





}

export const BankSchema = SchemaFactory.createForClass(Bank)