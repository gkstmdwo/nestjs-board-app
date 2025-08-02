import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Auth, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import bcrypt from 'node_modules/bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const { username, password } = authCredentialsDto;

        // salt + 비밀번호를 Hash 로 암호화하여 저장
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.userRepository.create({
            username,
            password: hashedPassword,
        });
        try {
            await this.userRepository.save(user);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Exsiting Username');
            } else {
                throw new InternalServerErrorException();
            }
        }
        return user;
    }

    async singIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto;
        const user = await this.userRepository.findOneBy({ username });
        if (user && (await bcrypt.compare(password, user.password))) {
            return 'login success';
        } else {
            throw new UnauthorizedException('login fail');
        }
    }
}
