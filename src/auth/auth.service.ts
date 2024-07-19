import {
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto, GoogleAuthDto } from "./dto";
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

  async googleValidate(dto: GoogleAuthDto) {
    console.log("Google Auth Service");
    console.log(dto);

    const userAccount =
      await this.prisma.userAccount.findUnique({
        where: { username: dto.username },
        include: { userAccout: true },
      });

    if (
      userAccount &&
      userAccount.userAccout.length > 0
    ) {
      return userAccount.userAccout[0];
    }
    console.log("User not found. Creating...");

    const newUserAccount =
      await this.prisma.userAccount.create({
        data: {
          username: dto.username,
          password: await argon.hash(
            Math.random().toString(36).slice(-8)
          ), // Random password as it won't be used
          userAccout: {
            create: {
              name: `${dto.firstName} ${dto.lastName}`.trim(),
              telephoneNumber: "",
              photoUrl: dto.picture,
              currentPoints: 0,
            },
          },
        },
        include: { userAccout: true },
      });
  }

  async findUser(id: string) {
    const user =
      await this.prisma.userAccount.findUnique({
        where: {
          id: id,
        },
      });
    return user;
  }
}
