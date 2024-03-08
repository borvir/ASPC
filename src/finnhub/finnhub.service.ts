import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { CronJob } from 'cron';
import { StockService } from 'src/stock/stock.service';
import { DefaultApi } from 'node_modules/finnhub/dist/api/DefaultApi.js'

const finnhub = require('finnhub');

@Injectable()
export class FinnhubService {
  finnhubClient: DefaultApi;

  constructor(
    private httpService: HttpService,
    @Inject(forwardRef(() => StockService))
    private stockService: StockService,
    private configService: ConfigService,
    private schedulerRegistry: SchedulerRegistry,
  ) {
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = this.configService.get('API_KEY');
    this.finnhubClient = new finnhub.DefaultApi();
  }

  @Cron(CronExpression.EVERY_MINUTE, { name: 'AAPL' })
  async handleCron() {
    try {
      this.finnhubClient.quote(
        this.configService.get('SYMBOL'),
        (error, data, response) => {
          try {
            this.stockService.createItem({
              symbol: this.configService.get('SYMBOL'),
              c: data.c,
              d: data.d,
              dp: data.dp,
              h: data.h,
              l: data.l,
              o: data.o,
              pc: data.pc,
            });
          } catch (error) {
            throw new Error(error);
          }
        },
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async addCronJob(symbol: string) {
    const resp = await firstValueFrom(
      this.httpService.get(
        `${this.configService.get(
          'STOCK_PRICE_URL',
        )}?symbol=${symbol}&token=${this.configService.get('API_KEY')}`,
      ),
    );

    if (resp.data.c != 0) {
      try {
        const job = new CronJob(CronExpression.EVERY_MINUTE, async () => {
          try {
            this.finnhubClient.quote(symbol, (error, data, response) => {
              try {
                this.stockService.createItem({
                  symbol: symbol,
                  c: data.c,
                  d: data.d,
                  dp: data.dp,
                  h: data.h,
                  l: data.l,
                  o: data.o,
                  pc: data.pc,
                });
              } catch (error) {
                throw new Error(error);
              }
            });
          } catch (error) {
            throw new Error(error);
          }
        });

        this.schedulerRegistry.addCronJob(symbol, job);
        job.start();

        return 'Job started';
      } catch (error) {
        throw new Error(error);
      }
    } else {
      throw new NotFoundException();
    }
  }
}
