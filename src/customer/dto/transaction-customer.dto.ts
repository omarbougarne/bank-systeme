import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CustomerTransDto {


    cust_id: string

    @IsNotEmpty()
    @IsNumber()
    balance: string;

    @IsNotEmpty()
    @IsNumber()
    deposit: number;
}