import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

Schema({
    timestamps: true
})
export class Bank {

    @Prop({})
    lonDetails: string;

    @Prop({ unique: true })
    transNo: string;

    @Prop({})
    transDate: Date;

    @Prop({})
    transTime: Date;


}

export const BankSchema = SchemaFactory.createForClass(Bank);