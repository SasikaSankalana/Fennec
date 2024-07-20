import {
  ForbiddenException,
  Injectable,
  Req,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
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
        expiresIn: "15m",
        secret: secret,
      }
    );

    return {
      access_token: token,
    };
  }

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

  async Onboarding(dto) {
    try {
      const userAccount =
        await this.prisma.userAccount.findUnique({
          where: { username: dto.username },
        });

      const existingOnboarding =
        await this.prisma.onboarding.findFirst({
          where: {
            userAccountId: userAccount.id,
          },
        });

      if (existingOnboarding) {
        throw new Error(
          `Onboarding record already exists`
        );
        return "Onboarding record already exists";
      }
      if (!userAccount) {
        throw new Error(
          `UserAccount with username ${dto.username} not found`
        );
      }

      const onboarding =
        await this.prisma.onboarding.create({
          data: {
            residence: dto.residence,
            vancouverArea: dto.vancouverArea,
            nightlifeType: dto.nightlifeType,
            outingFreequency:
              dto.outingFreequency,
            favouriteInstrument:
              dto.favouriteInstrument,
            drinkOfChoice: dto.drinkOfChoice,
            groupOrAlone: dto.groupOrAlone,
            arrivalTime: dto.arrivalTime,
            appealingPromotion:
              dto.appealingPromotion,
            notificationPreference:
              dto.notificationPreference,
            nighlifeEnvironment:
              dto.nighlifeEnvironment,
            foodImportance: dto.foodImportance,
            drinkPreference: dto.drinkPreference,
            reasonForNightlife:
              dto.reasonForNightlife,
            userAccount: {
              connect: {
                username: dto.username,
              },
            },
          },
        });
      return onboarding;
    } catch (error) {
      throw error;
    }
  }
}
