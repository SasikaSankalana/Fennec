import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { ConfigService } from "@nestjs/config";
import { Profile } from "passport";
import {
  Inject,
  Injectable,
} from "@nestjs/common";
import { AuthService } from "../auth.service";
import { GoogleAuthDto } from "../dto";

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  Strategy,
  "google"
) {
  constructor(
    @Inject("AUTH_SERVICE")
    private readonly authService: AuthService,
    config: ConfigService
  ) {
    super({
      clientID: config.get("GOOGLE_CLIENT_ID"),
      clientSecret: config.get(
        "GOOGLE_CLIENT_SECRET"
      ),
      callbackURL: config.get(
        "GOOGLE_CALLBACK_URL"
      ),
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

    const { name, emails, photos } = profile;
    const userAccount: GoogleAuthDto = {
      username: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
    };

    const user =
      await this.authService.googleValidate(
        userAccount
      );

    return user;
  }
}
