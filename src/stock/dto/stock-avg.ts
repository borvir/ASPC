import { IsString } from "class-validator";

export class StockAvgDto {

    @IsString()
    symbol: string;

    @IsString()
    lastUpdated: string;

    @IsString()
    movingAverage: number;
}
