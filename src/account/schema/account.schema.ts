import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Account {

    @Prop({ unique: true })
    accountNumber: string

    @Prop({ unique: true })
    customer: string

    @Prop({ required: true, unique: false })
    balance: number;
}

export const AccountSchema = SchemaFactory.createForClass(Account)