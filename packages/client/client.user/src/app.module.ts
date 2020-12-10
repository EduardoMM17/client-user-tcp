import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MsAppModule } from 'ms-user';
import { User } from 'ms-user';

@Module({
  imports: [UserModule, ConfigModule.forRoot(), MsAppModule],
})
export class AppModule {}
