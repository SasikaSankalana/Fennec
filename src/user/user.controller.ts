import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { FirebaseGuard } from '../auth/guard';
import { UserService } from './user.service';
import { locationDto, OnboardDto, paymentDetailsDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(FirebaseGuard)
@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(FirebaseGuard)
  @Post('onboarding')
  Onboarding(@Body() dto: OnboardDto, @Req() req) {
    return this.userService.Onboarding(dto);
  }

  @UseGuards(FirebaseGuard)
  @Post('payment-details')
  async addPayment(@Body() dto: paymentDetailsDto) {
    return this.userService.addPayment(dto);
  }

  @UseGuards(FirebaseGuard)
  @Post('location')
  async addLocation(@Body() dto: locationDto) {
    return this.userService.changeLocation(dto);
  }

  @UseGuards(FirebaseGuard)
  @Put('telephone')
  async updateTelephoneNumber(id: string, telephone: string) {
    return this.updateTelephoneNumber(id, telephone);
  }
}
