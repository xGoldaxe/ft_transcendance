import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { IntraStrategy } from './intra.strategy';
import { IntraAuthGuard } from './auth.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, HttpModule, ConfigModule],
  providers: [AuthService, IntraStrategy, IntraAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
