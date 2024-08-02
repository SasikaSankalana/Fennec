import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { UserService } from './user.service';
import { locationDto, OnboardDto, paymentDetailsDto, UserDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Post('onboarding')
  Onboarding(@Body() dto: OnboardDto) {
    return this.userService.Onboarding(dto);
  }

  @UseGuards(JwtGuard)
  @Post('payment-details')
  async addPayment(@Body() dto: paymentDetailsDto) {
    return this.userService.addPayment(dto);
  }

  @UseGuards(JwtGuard)
  @Post('location')
  async addLocation(@Body() dto: locationDto) {
    return this.userService.changeLocation(dto);
  }

  @UseGuards(JwtGuard)
  @Put('telephone')
  async updateTelephoneNumber(id: string, telephone: string) {
    return this.updateTelephoneNumber(id, telephone);
  }

  @UseGuards(JwtGuard)
  @Put('update/:id')
  async updateUser(@Param('id') id: string, @Body() dto: UserDto) {
    return this.userService.updateUser(id, dto);
  }
}
