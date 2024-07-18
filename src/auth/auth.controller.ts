import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { GoogleGuard } from "./guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("signin")
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }

  @UseGuards(GoogleGuard)
  @HttpCode(HttpStatus.OK)
  @Get("google/signin")
  googleSignin() {
    return "Google Signin";
  }

  @UseGuards(GoogleGuard)
  @HttpCode(HttpStatus.OK)
  @Get("google/redirect")
  googleRedirect() {
    return "OK";
  }
}
