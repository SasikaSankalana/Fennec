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
import { AuthDto, GoogleAuthDto } from "./dto";
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
  @Get("google/signin")
  googleSignin() {
    return { msg: "Google Signin" };
  }

  @UseGuards(GoogleGuard)
  @Get("google/redirect")
  googleRedirect() {
    return { msg: "OK" };
  }

  @Post("google/validate")
  googleValidate(@Body() dto: GoogleAuthDto) {
    return this.authService.googleValidate(dto);
  }
}
