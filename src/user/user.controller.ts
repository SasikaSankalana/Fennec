import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { locationDto, OnboardDto, paymentDetailsDto, UserDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('onboarding')
  Onboarding(@Body() dto: OnboardDto) {
    return this.userService.Onboarding(dto);
  }

  @Post('payment-details')
  async addPayment(@Body() dto: paymentDetailsDto) {
    return this.userService.addPayment(dto);
  }

  @Post('location')
  async addLocation(@Body() dto: locationDto) {
    return this.userService.addLocation(dto);
  }

  @Put('telephone')
  async updateTelephoneNumber(id: string, telephone: string) {
    return this.updateTelephoneNumber(id, telephone);
  }

  @Put('update/:id')
  async updateUser(@Param('id') id: string, @Body() dto: UserDto) {
    return this.userService.updateUser(id, dto);
  }
}
