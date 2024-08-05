import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Get,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  locationDto,
  OnboardDto,
  paymentDetailsDto,
  UserDto,
  userSettingsDto,
} from './dto';
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

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() dto: UserDto) {
    return this.userService.updateUser(id, dto);
  }

  @Put(':userId/settings')
  async updateUserSettings(
    @Param('userId') userId: string,
    @Body() dto: userSettingsDto,
  ) {
    return this.userService.updateUserSettings(userId, dto);
  }

  @Get(':userId/settings')
  async getUserSettings(@Param('userId') userId: string) {
    return this.userService.getUserSettings(userId);
  }

  @Get(':userId')
  async getUser(@Param('userId') userId: string) {
    return this.userService.getUser(userId);
  }

  // @Delete(':userId/photo')
  // async deleteUserPhoto(userId: string) {
  //   return this.userService.deleteUserPhoto(userId);
  // }

  // @Put(':userId/photo')
  // async updateUserPhoto(userId: string, photoUrl: string) {
  //   return this.userService.updateUserPhoto(userId, photoUrl);
  // }
}
