import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAccountDto {


    @IsNotEmpty()
    @IsString()
    loanDetails: string;

    @IsNotEmpty()
    @IsString()
    transNo: string;

    @IsNotEmpty()
    @IsString()
    transDate: Date;

    @IsNotEmpty()
    @IsNumber()
    transTime: Date;
}