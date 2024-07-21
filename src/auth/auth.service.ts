import {
  ForbiddenException,
  Injectable,
  Req,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import {
  AuthDto,
  GoogleAuthDto,
  OtpDto,
} from "./dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/user/user.service";
import { access } from "fs";

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
      const newUserAccount =
        await this.prisma.userAccount.create({
          data: {
            username: dto.username,
            password: hash,
          },
        });

      const newUser =
        await this.prisma.user.create({
          data: {
            name: "",
            telephoneNumber: "",
            photoUrl: "",
            currentPoints: 0,
            userAccount: {
              connect: {
                id: newUserAccount.id,
              },
            },
          },
        });

      const jwtToken = await this.signToken(
        newUserAccount.id,
        newUserAccount.username
      );
      return {
        jwtToken,
        id: newUserAccount.id,
        username: newUserAccount.username,
      };
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
    try {
      const userAccount =
        await this.prisma.userAccount.findUnique({
          where: {
            username: dto.username,
          },
        });

      if (!userAccount)
        throw new ForbiddenException(
          "Incorrect Credentials"
        );

      const pwMatch = await argon.verify(
        userAccount.password,
        dto.password
      );

      if (!pwMatch)
        throw new ForbiddenException(
          "Incorrect Credentials"
        );

      const jwtToken = await this.signToken(
        userAccount.id,
        userAccount.username
      );
      return {
        jwtToken,
        id: userAccount.id,
        username: userAccount.username,
      };
    } catch (error) {
      throw error;
    }
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

  async googleSignUp(dto: GoogleAuthDto) {
    try {
      const userAccount =
        await this.prisma.userAccount.findUnique({
          where: {
            username: dto.username,
          },
        });

      if (!userAccount) {
        const newUserAccount =
          await this.prisma.userAccount.create({
            data: {
              username: dto.username,
              password: " ",
            },
          });

        console.log(newUserAccount);

        const newUser =
          await this.prisma.user.create({
            data: {
              name: dto.name,
              telephoneNumber: "",
              photoUrl: dto.photoUrl,
              currentPoints: 0,
              userAccount: {
                connect: {
                  id: newUserAccount.id,
                },
              },
            },
          });

        const token = await this.signToken(
          newUserAccount.id,
          newUserAccount.username
        );

        return {
          access_token: token.access_token,
          userId: newUserAccount.id,
          userName: newUserAccount.username,
        };
      } else {
        throw new ForbiddenException(
          "User already exists"
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async googleSignIn(username: string) {
    try {
      const user =
        await this.prisma.userAccount.findUnique({
          where: {
            username: username,
          },
        });

      if (!user) {
        throw new ForbiddenException(
          "User not found"
        );
      }

      const token = await this.signToken(
        user.id,
        user.username
      );

      return {
        access_token: token.access_token,
        userId: user.id,
        userName: user.username,
      };
    } catch (error) {
      throw error;
    }
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
        await client.verify.v2
          .services(serviceId)
          .verificationChecks.create({
            to: dto.telephone,
            code: dto.code,
          });

      console.log(
        `Verification status: ${verificationCheck.status}`
      );

      // const user = await this.prisma.user.update({
      //   where: {
      //     id: dto.id,
      //   },
      //   data: {
      //     telephoneNumber: dto.telephone,
      //   },
      // });
      // return user;
    } catch (error) {
      console.error(
        "Error during OTP validation check:",
        error
      );
    }
  }
}
