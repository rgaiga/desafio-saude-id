/* istanbul ignore file */
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { types } from 'pg';

import { HttpExceptionFilter, TypeORMExceptionFilter } from './filters';
import { AppModule } from './app.module';

async function bootstrap() {
    types.setTypeParser(types.builtins.NUMERIC, (value: string): number =>
        parseFloat(value),
    );

    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RABBITMQ_URL],
                queue: process.env.RABBITMQ_ORDERS_QUEUE,
                queueOptions: {
                    durable: true,
                },
            },
        },
    );
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalFilters(new TypeORMExceptionFilter());

    await app.listen();
}
bootstrap();
