import { IsNotEmpty, IsNumber } from "class-validator";

export class DepositDto {


    @IsNotEmpty()
    @IsNumber()
    deposit: string;

    idR: string;
    idS: string;

}