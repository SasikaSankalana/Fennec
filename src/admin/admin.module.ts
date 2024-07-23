import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminClubModule } from './admin-club/admin-club.module';

@Module({
  imports: [AdminClubModule],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
