import { CoreEntity } from 'src/core/enitity/core.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Stock extends CoreEntity {
  @Column({ nullable: false })
  symbol: string;

  @Column({ nullable: false })
  c: string;

  @Column({ nullable: true })
  d: string;

  @Column({ nullable: true })
  dp: string;

  @Column({ nullable: true })
  h: string;

  @Column({ nullable: true })
  l: string;

  @Column({ nullable: true })
  o: string;

  @Column({ nullable: true })
  pc: string;
}
