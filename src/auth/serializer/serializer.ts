import {
  Inject,
  Injectable,
} from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { UserAccount } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject("AUTH_SERVICE")
    private readonly authService: AuthService,
    private prisma: PrismaService
  ) {
    super();
  }

  serializeUser(
    user: UserAccount,
    done: Function
  ) {
    console.log("Serializer User");
    console.log(user);
    done(null, user);
  }

  async deserializeUser(
    payload: any,
    done: Function
  ) {
    const user = await this.authService.findUser(
      payload.id
    );

    console.log("Deserialize User");
    console.log(user);

    return user
      ? done(null, user)
      : done(null, null);
  }
}
