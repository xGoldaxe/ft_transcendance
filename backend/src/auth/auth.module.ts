import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { IntraStrategy } from './strategies/intra.strategy';
import { IntraAuthGuard } from './intra.guard';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

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
  providers: [AuthService, IntraStrategy, IntraAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
