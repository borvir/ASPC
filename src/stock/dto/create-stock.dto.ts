import { Stock } from '../entities/stock.entity';

export class StockCreateDto {
  symbol: string;

  c: string;
  d: string;
  dp: string;
  h: string;
  l: string;
  o: string;
  pc: string;

  static async toEntity(dto: StockCreateDto): Promise<Stock> {
    const entity = new Stock();

    entity.symbol = dto.symbol;
    entity.c = dto.c;
    entity.d = dto.d;
    entity.dp = dto.dp;
    entity.h = dto.h;
    entity.l = dto.l;
    entity.o = dto.o;
    entity.pc = dto.pc;

    return entity;
  }
}
