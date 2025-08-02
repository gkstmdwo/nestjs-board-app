import { Board } from 'src/boards/board.entity';
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany((type) => Board, (board) => board.user, { eager: true })
    // eager true : 유저 정보 조회 시, 보드 정보를 가져온다.
    // eager false : 유저 정보 조회 시, 보드 정보를 가져오지 않는다.
    boards: Board[];
}
