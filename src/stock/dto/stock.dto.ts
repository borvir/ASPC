import { IsString } from 'class-validator';
import { Stock } from '../entities/stock.entity';

export class StockDto {
  @IsString()
  symbol: string;

  @IsString()
  c: string;
  static async fromEntity(entity: Stock): Promise<StockDto> {
    const itemDto = new StockDto();

    itemDto.symbol = entity.symbol;
    itemDto.c = entity.c;

    return itemDto;
  }
}
