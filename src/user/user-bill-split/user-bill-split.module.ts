import { Module } from '@nestjs/common';
import { UserBillSplitService } from './user-bill-split.service';
import { UserBillSplitController } from './user-bill-split.controller';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  providers: [UserBillSplitService],
  controllers: [UserBillSplitController],
})
export class UserBillSplitModule {}
