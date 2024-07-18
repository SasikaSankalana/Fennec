import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { ConfigService } from "@nestjs/config";
import { Profile } from "passport";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  Strategy,
  "google"
) {
  constructor(config: ConfigService) {
    super({
      clientID: config.get("GOOGLE_CLIENT_ID"),
      clientSecret: config.get(
        "GOOGLE_CLIENT_SECRET"
      ),
      callbackURL:
        "https://localhost:3333/api/auth/google/redirect",
      scope: ["profile", "email"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile
  ) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
  }
}
