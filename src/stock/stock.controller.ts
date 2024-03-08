import { Controller, Get, Param, Put } from '@nestjs/common';
import { StockService } from './stock.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StockAvgDto } from './dto/stock-avg';

@Controller('stock')
@ApiTags('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  //that retrieves and displays the current stock price, the last updated time, and the moving average for the given symbol.
  @ApiOkResponse({
    description: '',
    type: StockAvgDto,
  })
  @Get(':symbol')
  findOne(@Param('symbol') symbol: string): Promise<StockAvgDto> {
    return this.stockService.getAvg(symbol);
  }

  //that starts the periodic checks for a given symbol.
  @Put(':symbol')
  update(@Param('symbol') symbol: string) {
    return this.stockService.addNew(symbol);
  }
}
