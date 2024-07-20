import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {
  Strategy,
  VerifyCallback,
} from "passport-google-oauth20";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  Strategy
) {
  constructor(config: ConfigService) {
    super({
      clientID: config.get("GOOGLE_CLIENT_ID"),
      clientSecret: config.get(
        "GOOGLE_CLIENT_SECRET"
      ),
      callbackURL: config.get(
        "GOOGLE_CALLBACK_URL"
      ),
      scope: ["email", "profile"],
    });
    config: ConfigService;
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    done(null, profile);
  }
}
