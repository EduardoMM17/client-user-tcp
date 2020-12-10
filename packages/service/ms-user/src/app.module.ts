import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/microserviceTask',
      synchronize: true,
      useUnifiedTopology: true,
      entities:[User],
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [User],
  exports: [User]
})
export class MsAppModule {}
