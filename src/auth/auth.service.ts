import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { HasingService } from 'src/hasing/hasing.service';
import { UsersService } from 'src/twitter/users/users.service';
import refreshJwtConfig from './config/refresh-jwt.config';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
        private hasingService: HasingService,
        private jwtService: JwtService,
        @Inject(refreshJwtConfig.KEY) private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
        private configService: ConfigService
    ) { }
    async validateUser({ email, password }: { email: string, password: string }) {
        const user = await this.userService.findOne(email);
        if (!user) throw new UnauthorizedException("User email not found");
        const matched = this.hasingService.compare(password, user.password);
        if (!matched) throw new UnauthorizedException("Invalid password");

        const payload = { sub: user.emailMatched, username: user.password };

        return { email: user.emailMatched }
    }

    async login(email: string) {
        const payload = { sub: email };
        const token = this.jwtService.sign(payload)
        const refreshtoken = this.jwtService.sign(payload, this.refreshTokenConfig)
        return {
            token,
            refreshtoken,
        }
    }

    refreshAccessToken(refreshToken: string) {
    const payload = this.jwtService.verify(refreshToken, {
        secret: this.refreshTokenConfig.secret,
    });

    const email = payload.sub;
    console.log(payload);

    const newAccessToken = this.jwtService.sign({ sub: email });

    return { access_token: newAccessToken };
}




}
