import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmOptionsFactory } from './config/typeorm-options.factory';
import { StockModule } from './stock/stock.module';
import { HttpModule } from "@nestjs/axios";
import { FinnhubModule } from './finnhub/finnhub.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(TypeOrmOptionsFactory.createTypeOrmOptions()),
    StockModule,
    HttpModule,
    // FinnhubModule,
  ],
})
export class AppModule {}
