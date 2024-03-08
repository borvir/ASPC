import { IsNumber, IsString } from 'class-validator';

export class StockAvgDto {
  @IsString()
  symbol: string;

  @IsString()
  lastUpdated: string;

  @IsNumber()
  movingAverage: number;
}
