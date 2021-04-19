import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AES } from "crypto-js";
import { Profile, Strategy } from "passport-discord";
import { AuthService } from "./auth.service";

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL,
            scope: ["identify"],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile) {
        const { username, id, avatar } = profile;

        const AESAccessToken = AES.encrypt(accessToken, process.env.ACCESS_KEY).toString();
        const AESRefreshToken = AES.encrypt(refreshToken, process.env.REFRESH_KEY).toString();

        return this.authService.validateUser({
            id,
            username,
            avatar: `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`,
            accessToken: AESAccessToken,
            refreshToken: AESRefreshToken,
            bio: "",
            tags: [],
            matches: [],
            rejections: [],
        });
    }
}
