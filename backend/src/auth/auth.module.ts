import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { IntraStrategy } from './strategies/intra.strategy';
import { IntraAuthGuard } from './guards/intra.guard';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt.guard';

@Module({
  imports: [
    PrismaModule,
    HttpModule,
    ConfigModule,
    JwtModule.register({
      secret: 'aegpaegnapegn' /** @todo a changer */,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    IntraStrategy,
    JwtStrategy,
    IntraAuthGuard,
    JwtAuthGuard,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
