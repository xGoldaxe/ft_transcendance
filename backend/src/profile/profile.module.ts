import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfileController } from './profile.controller';

@Module({
  providers: [PrismaService],
  controllers: [ProfileController],
})
export class ProfileModule {}
