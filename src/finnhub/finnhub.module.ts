import { Module } from '@nestjs/common';
import { FinnhubService } from './finnhub.service';
import { FinnhubController } from './finnhub.controller';
import { HttpModule } from '@nestjs/axios';
import { StockService } from 'src/stock/stock.service';

@Module({
  imports: [
    HttpModule],
  controllers: [FinnhubController],
  providers: [FinnhubService, StockService],
})
export class FinnhubModule {}
