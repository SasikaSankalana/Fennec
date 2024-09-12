import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserBillSplitService } from './user-bill-split.service';
import { SplitGroupDto, SplitPaymentDto } from './dto';

@Controller('bill-split')
export class UserBillSplitController {
  constructor(private userBillSplitService: UserBillSplitService) {}

  @Post(':userId/group')
  createSplitGroup(
    @Body() dto: SplitGroupDto,
    @Param('userId') userId: string,
  ) {
    return this.userBillSplitService.createSplitGroup(dto, userId);
  }

  @Get(':userId/groups')
  getAllSplitGroups(@Param('userId') userId: string) {
    return this.userBillSplitService.getAllSplitGroups(userId);
  }

  @Get('group/:groupId')
  getSplitGroupById(@Param('groupId') groupId: string) {
    return this.userBillSplitService.getSplitGroupById(groupId);
  }

  @Post('/:userId/payment')
  splitPayment(@Body() dto: SplitPaymentDto, @Param('userId') userId: string) {
    return this.userBillSplitService.splitPayment(userId, dto);
  }
}
