import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserService } from './database/user/user.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [PrismaService, UserService],
})
export class AppModule {}
