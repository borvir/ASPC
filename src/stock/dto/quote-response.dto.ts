import { IsNumber } from 'class-validator';

export class QuoteResponseDto {
  @IsNumber()
  c: number;

  @IsNumber()
  d: number;

  @IsNumber()
  dp: number;

  @IsNumber()
  h: number;

  @IsNumber()
  l: number;

  @IsNumber()
  o: number;

  @IsNumber()
  pc: number;
}
