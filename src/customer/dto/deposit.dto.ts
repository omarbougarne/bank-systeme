import { IsNotEmpty, IsNumber } from "class-validator";

export class DepositDto {


    @IsNotEmpty()
    @IsNumber()
    deposit: number;

    idR: string;
    idS: string;

}