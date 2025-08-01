import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import type { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
    // boardsService : BoardsService;
    // constructor(boardsService: BoardsService){
    //     this.boardsService = boardsService;
    // }
    // 위 코드 축약
    constructor(private boardsService: BoardsService) {}

    @Get()
    getAllBoards(): Board[] {
        return this.boardsService.getAllBoards();
    }

    // @Post()
    // createBoard(
    //     @Body('title') title:string,
    //     @Body('description') description:string
    // ): Board {
    //     return this.boardsService.createBoard(title, description);
    // }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto): Board {
        return this.boardsService.createBoard(createBoardDto);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: string): Board | undefined {
        return this.boardsService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard(@Param('id') id: string): void {
        this.boardsService.deleteBoard(id);
    }

    @Patch('/:id/status')
    putBoard(
        @Param('id') id: string,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    ) {
        return this.boardsService.putBoard(id, status);
    }
}
