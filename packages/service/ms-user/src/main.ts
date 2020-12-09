import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const logger = new Logger('Main');

const microservicesOptions = {
  transport: Transport.TCP,
  options: {
    host: '127.0.0.1',
    port: 8877, 
  }
}

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, microservicesOptions);
  await app.listen(()=>{
    logger.log('Microservice is listening... ');
  });
}
bootstrap();
