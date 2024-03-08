import { CoreEntity } from "src/core/enitity/core.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Stock extends CoreEntity {

    @Column()
    symbol: string;

    @Column()
    c: string;

    @Column()
    d: string;

    @Column()
    dp: string;

    @Column()
    h: string;

    @Column()
    l: string;

    @Column()
    o: string;

    @Column()
    pc: string;
}
