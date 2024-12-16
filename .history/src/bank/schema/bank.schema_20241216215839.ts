import { Schema, Prop } from "@nestjs/mongoose";

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