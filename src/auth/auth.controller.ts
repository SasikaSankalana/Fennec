import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto';
<<<<<<< HEAD
// import { FirebaseGuard } from './guard';
=======
>>>>>>> 8320c058529c2fe3e12764f1d1680dd0f8f7feba

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Req() req) {
    const email = req.user.email;
    return this.authService.signIn(email);
  }
}
