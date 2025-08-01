import {
    ArgumentMetadata,
    BadRequestException,
    PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from '../board-status.enum';

export class BoardStatusValidationPipe implements PipeTransform {
    // transform(value: any, metadata: ArgumentMetadata) {
    //     console.log(value);
    //     console.log(metadata);
    // }
    readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

    transform(value: any) {
        value = value.toUpperCase();
        if (!this.isStatusValid(value)) {
            throw new BadRequestException(
                `${value} isn't in the status options`,
            );
        }
        return value;
    }

    private isStatusValid(value) {
        const index = this.StatusOptions.indexOf(value);
        return index !== -1;
    }
}
