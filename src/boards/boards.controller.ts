import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import type { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    // boardsService : BoardsService;
    // constructor(boardsService: BoardsService){
    //     this.boardsService = boardsService;
    // }
    // 위 코드 축약
    constructor(private boardsService: BoardsService) {}

    @Get()
    getAllBoards(@GetUser() user: User): Promise<Board[]> {
        return this.boardsService.getAllBoards(user);
    }
    // @Get()
    // getAllBoards(): Board[] {
    //     return this.boardsService.getAllBoards();
    // }

    // @Post()
    // createBoard(
    //     @Body('title') title:string,
    //     @Body('description') description:string
    // ): Board {
    //     return this.boardsService.createBoard(title, description);
    // }
    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto: CreateBoardDto,
        @GetUser() user: User,
    ): Promise<Board> {
        return this.boardsService.createBoard(createBoardDto, user);
    }
    // @Post()
    // @UsePipes(ValidationPipe)
    // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    //     return this.boardsService.createBoard(createBoardDto);
    // }

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardsService.getBoardById(id);
    }
    // @Get('/:id')
    // getBoardById(@Param('id') id: string): Board | undefined {
    //     return this.boardsService.getBoardById(id);
    // }

    @Delete('/:id')
    deleteBoard(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<void> {
        return this.boardsService.deleteBoard(id, user);
    }
    // @Delete('/:id')
    // deleteBoard(@Param('id') id: string): void {
    //     this.boardsService.deleteBoard(id);
    // }

    @Patch('/:id/status')
    putBoard(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    ): Promise<Board> {
        return this.boardsService.putBoard(id, status);
    }
    // @Patch('/:id/status')
    // putBoard(
    //     @Param('id') id: string,
    //     @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    // ) {
    //     return this.boardsService.putBoard(id, status);
    // }
}
