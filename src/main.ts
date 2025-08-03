import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import config from 'config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // const serverconfig = config.get('server');
    const serverconfig = config.get('server');
    const port = serverconfig.port;

    await app.listen(process.env.PORT ?? port);
    Logger.log(`Application running on port ${port}`);
}
bootstrap();
