import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { StockCreateDto } from './dto/create-stock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from './entities/stock.entity';
import { StockDto } from './dto/stock.dto';
import { StockAvgDto } from './dto/stock-avg';
import { FinnhubService } from 'src/finnhub/finnhub.service';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private repository: Repository<Stock>,
    @Inject(forwardRef(() => FinnhubService))
    private finnhubService: FinnhubService,
  ) {}

  public async createItem(dto: StockCreateDto): Promise<StockDto> {
    const item = await StockCreateDto.toEntity(dto);
    const entity = await this.repository.save(item);
    const ret = await this.repository.findOne({ where: { id: entity.id } });
    return StockDto.fromEntity(ret);
  }

  getAvg(symbol: string) {
    return this.movingAverageCalc(symbol);
  }

  addNew(symbol: string) {
    return this.finnhubService.addCronJob(symbol);
  }

  async movingAverageCalc(symbol: string): Promise<StockAvgDto> {
    try {
      const items = await this.repository.find({
        where: { symbol: symbol },
        order: { createdAt: 'DESC' },
        take: 10,
      });

      if (!items.length) throw new NotFoundException();

      if (items) {
        const prices = items.map((x) => Number(x.c));

        if (prices.length) {
          const sum = prices.reduce((a, b) => Number(a) + Number(b));

          let avg: number;

          if (prices.length < 10) {
            avg = sum / prices.length;
          } else {
            avg = sum / 10;
          }

          return {
            symbol: symbol,
            lastUpdated: items[0].createdAt.toLocaleString(),
            movingAverage: avg,
          };
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
