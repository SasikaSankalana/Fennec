import {
  Controller,
  Get,
  Patch,
  Req,
  UseGuards,
} from "@nestjs/common";
import { GetUser } from "../auth/decorator";
import {
  GoogleGuard,
  JwtGuard,
} from "../auth/guard";
import { User } from "@prisma/client";

@UseGuards(JwtGuard)
@Controller("users")
export class UserController {
  @UseGuards(JwtGuard)
  @Get("me")
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser() {}
}
