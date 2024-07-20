import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto, OnboardDto } from "./dto";
import { Response } from "express";
import { GoogleGuard, JwtGuard } from "./guard";

@Controller("auth")
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

  @UseGuards(GoogleGuard)
  @Get("google/signin")
  async google() {}

  @UseGuards(GoogleGuard)
  @Get("google/redirect")
  async googleCallback(
    @Req() req,
    @Res() res: Response
  ) {
    return this.authService.googleCallback(
      req,
      res
    );
  }

  // @UseGuards(JwtGuard)
  @Post("onboarding")
  Onboarding(@Body() dto: OnboardDto) {
    return this.authService.Onboarding(dto);
  }
}
