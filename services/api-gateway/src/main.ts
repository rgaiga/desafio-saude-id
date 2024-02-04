/* istanbul ignore file */
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix(process.env.BASE_PATH);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.enableCors();
    app.use(helmet());
    app.use(
        helmet.contentSecurityPolicy({
            directives: {
                upgradeInsecureRequests: null,
            },
        }),
    );

    const config = new DocumentBuilder()
        .setTitle('Desafio Técnico - Saúde iD')
        .setDescription(
            'Desafio técnico desenvolvido para a Saúde iD em 01/02/2023.',
        )
        .setVersion('1.0')
        .addTag('users', 'Todas as rotas relacionadas aos usuários')
        .addTag('products', 'Todas as rotas relacionadas aos produtos')
        .addTag('orders', 'Todas as rotas relacionadas às ordens')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger-ui', app, document);

    await app.listen(process.env.SERVER_PORT);
}
bootstrap();
