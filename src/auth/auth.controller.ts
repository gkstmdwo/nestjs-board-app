import {
    Body,
    Controller,
    Post,
    Req,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    ): Promise<User> {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    ): Promise<{ accessToken: string }> {
        return this.authService.singIn(authCredentialsDto);
    }

    // @Post('/test')
    // // @nestjs/passort 에서 가져온 AuthGuard() 를 이용하면 요청 안에 유저 정보를 넣을 수 있음
    // @UseGuards(AuthGuard())
    // test(@Req() req) {
    //     console.log('req', req);
    // }
    @Post('/test')
    // @nestjs/passort 에서 가져온 AuthGuard() 를 이용하면 요청 안에 유저 정보를 넣을 수 있음
    @UseGuards(AuthGuard())
    test(@GetUser() user: User) {
        console.log('user', user);
    }
}
