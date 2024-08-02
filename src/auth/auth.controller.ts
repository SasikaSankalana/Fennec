import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import * as FirebaseAuth from 'firebase/auth';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto';
import { FirebaseGuard } from './guard';
@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(FirebaseGuard)
  @Post('signup')
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @HttpCode(HttpStatus.OK)
  // @UseGuards(FirebaseGuard)
  @Post('signin')
  signin(@Req() req) {
    const email = req.user.email;
    return this.authService.signIn(email);
  }
}
