import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import {
  AuthDto,
  GoogleAuthDto,
  OtpDto,
} from "./dto";
import { JwtGuard } from "./guard";

@Controller("auth")
@ApiTags("Authentication")
export class AuthController {
  constructor(private authService: AuthService) {}

  public jwtToken = { access_token: "" };

  @Post("signup")
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("signin")
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
  @Post("google/signup")
  async googleSignUp(@Body() dto: GoogleAuthDto) {
    return this.authService.googleSignUp(dto);
  }

  @Post("google/signin")
  async googleSignIn(
    @Body("username") username: string
  ) {
    return this.authService.googleSignIn(
      username
    );
  }

  @UseGuards(JwtGuard)
  @Post("verification")
  otpVerification(
    @Body("telephone") telephone: string
  ) {
    return this.authService.otpVerification(
      telephone
    );
  }

  @UseGuards(JwtGuard)
  @Post("verification/check")
  otpVerificationCheck(@Body() dto: OtpDto) {
    return this.authService.otpVerificationCheck(
      dto
    );
  }
}
