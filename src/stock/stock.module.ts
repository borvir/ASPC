import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { HttpModule } from '@nestjs/axios';
import { FinnhubService } from 'src/finnhub/finnhub.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Stock]),
    HttpModule,
  ],
  controllers: [StockController],
  providers: [StockService, FinnhubService],
})
export class StockModule {}
