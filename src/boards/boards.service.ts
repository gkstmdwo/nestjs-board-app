import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(Board)
        private boardRepository: Repository<Board>,
    ) {}

    async getAllBoards(user: User): Promise<Board[]> {
        const query = this.boardRepository.createQueryBuilder('board');
        query.where('board.userId = :userId', { userId: user.id });
        const boards = await query.getMany();
        return boards;
        // return this.boardRepository.find();
    }
    // getAllBoards(): Board[] {
    //     return this.boards;
    // }

    async createBoard(
        createBoardDto: CreateBoardDto,
        user: User,
    ): Promise<Board> {
        const { title, description } = createBoardDto;

        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user,
        });
        await this.boardRepository.save(board);
        return board;
    }
    // createBoard(createBoardDto: CreateBoardDto): Board {
    //     const { title, description } = createBoardDto;
    //     const board: Board = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: BoardStatus.PUBLIC,
    //     };
    //     this.boards.push(board);
    //     return board;
    // }

    async getBoardById(id: number): Promise<Board> {
        const found = await this.boardRepository.findOneBy({ id });
        if (!found) {
            throw new NotFoundException(`Can't found board with id ${id}`);
        }
        return found;
    }
    // getBoardById(id: string): Board {
    //     const found = this.boards.find((board) => board.id === id);
    //     if (!found) {
    //         throw new NotFoundException(`Can't found board with id ${id}`);
    //     }
    //     return found;
    // }

    async deleteBoard(id: number, user: User): Promise<void> {
        const result = await this.boardRepository.delete({ id, user: user });
        if (result.affected === 0) {
            throw new NotFoundException(`Can't found board with id ${id}`);
        }
    }
    // deleteBoard(id: string): void {
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter((board) => board.id !== id);
    // }

    async putBoard(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);
        board.status = status;
        await this.boardRepository.save(board);
        return board;
    }
    // putBoard(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
}
