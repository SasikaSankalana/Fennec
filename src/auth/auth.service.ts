import {
  ForbiddenException,
  Injectable,
  Req,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto, OtpDto } from "./dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);

    try {
      const user =
        await this.prisma.userAccount.create({
          data: {
            username: dto.username,
            password: hash,
          },
        });

      return this.signToken(
        user.id,
        user.username
      );
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === "P2002") {
          throw new ForbiddenException(
            "Credentials Taken"
          );
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    const user =
      await this.prisma.userAccount.findUnique({
        where: {
          username: dto.username,
        },
      });

    if (!user)
      throw new ForbiddenException(
        "Incorrect Credentials"
      );

    const pwMatch = await argon.verify(
      user.password,
      dto.password
    );

    if (!pwMatch)
      throw new ForbiddenException(
        "Incorrect Credentials"
      );

    return this.signToken(user.id, user.username);
  }

  async signToken(
    userId: string,
    username: string
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      username,
    };

    const secret = this.config.get("JWT_SECRET");

    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: "60m",
        secret: secret,
      }
    );

    return {
      access_token: token,
    };
  }

  //not working properly
  async googleCallback(Request, Response) {
    const jwt = await this.signToken(
      Request.user.id,
      Request.user.username
    );
    const jwtToken = jwt;
    Response.set(
      "authorization",
      jwt.access_token
    );
    Response.status(200);
    return Response.json(Request.user);
  }

  async otpVerification(telephone: string) {
    try {
      const accountSid = this.config.get(
        "TWILIO_ACCOUNT_SID"
      );
      const authToken = this.config.get(
        "TWILIO_AUTH_TOKEN"
      );
      const serviceId = this.config.get(
        "TWILIO_SERVICE_ID"
      );

      const client = require("twilio")(
        accountSid,
        authToken
      );

      const verification = await client.verify.v2
        .services(serviceId)
        .verifications.create({
          to: telephone,
          channel: "sms",
        });
      console.log(
        `Verification status: ${verification.status}`
      );
    } catch (error) {
      console.error(
        "Error during OTP validation:",
        error
      );
    }
  }

  async otpVerificationCheck(dto: OtpDto) {
    try {
      const accountSid = this.config.get(
        "TWILIO_ACCOUNT_SID"
      );
      const authToken = this.config.get(
        "TWILIO_AUTH_TOKEN"
      );
      const serviceId = this.config.get(
        "TWILIO_SERVICE_ID"
      );

      const client = require("twilio")(
        accountSid,
        authToken
      );

      const verificationCheck =
        await client.verify
          .services(serviceId)
          .verificationChecks.create({
            to: dto.telephone,
            code: dto.code,
          });

      console.log(
        `Verification status: ${verificationCheck.status}`
      );
    } catch (error) {
      console.error(
        "Error during OTP validation check:",
        error
      );
    }
  }
}
