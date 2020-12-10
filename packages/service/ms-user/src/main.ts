import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
require('dotenv').config();
import { MsAppModule } from './app.module';

const logger = new Logger('Main');

const microservicesOptions = {
  transport: Transport.TCP,
  options: {
    host: process.env.TCP_HOST,
    port: 8877, 
  }
}

async function bootstrap() {
  const app = await NestFactory.createMicroservice(MsAppModule, microservicesOptions);
  await app.listen(()=>{
    logger.log('Microservice is listening... ');
  });
}
bootstrap();
