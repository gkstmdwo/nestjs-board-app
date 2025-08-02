import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        // passport module : JWT 인증 처리 과정을 쉽게 도와주는 모듈
        PassportModule.register({ defaultStrategy: 'jwt' }),
        // secret : 토큰을 만들 떄 이용하는 secret 텍스트 (아무 텍스트나 가능)
        // expiresIn : 토큰 만료 시간 (60*60 = 1시간 이후 토큰 만료)
        JwtModule.register({
            secret: 'Secret1234',
            signOptions: {
                expiresIn: 60 * 60,
            },
        }),
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
