import {
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";


export class CoreEntity {  
    constructor(id?: string) {
        if (id !== undefined) {
            this.id = id;
        }
    }

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    changedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
}
