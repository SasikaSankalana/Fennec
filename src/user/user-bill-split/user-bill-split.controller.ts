import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserBillSplitService } from './user-bill-split.service';
import { SplitGroupDto, SplitPaymentDto } from './dto';

@Controller('bill-split')
export class UserBillSplitController {
  constructor(private userBillSplitService: UserBillSplitService) {}

  @Get('group/:groupId')
  getSplitGroupById(@Param('groupId') groupId: string) {
    return this.userBillSplitService.getSplitGroupById(groupId);
  }
}
