import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { HasingService } from 'src/hasing/hasing.service';
import { UsersService } from 'src/twitter/users/users.service';
import refreshJwtConfig from './config/refresh-jwt.config';
import { Response } from 'express';
import { Request } from 'express';
import { AuthJwtPayload } from './type/jwtpayload';

// interface RequestWithCookies extends Request {
//   cookies: {
//     refresh_token?: string;
//     access_token?: string;
//     [key: string]: any;
//   };
// }

@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
        private hasingService: HasingService,
        private jwtService: JwtService,
        @Inject(refreshJwtConfig.KEY) private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
        private configService: ConfigService
    ) { }
    async validateUser({ email, password }: { email: string, password: string }) {
        console.log(email);
        const user = await this.userService.findOne(email);
        if (!user) throw new UnauthorizedException("User email not found");
        const matched = this.hasingService.compare(password, user.password);
        if (!matched) throw new UnauthorizedException("Invalid password");

        const payload = { sub: user.emailMatched };

        return { email: user.emailMatched }
    }

    async login(email: string, res: Response) {
        const payload = { sub: email };
        const token = this.jwtService.sign(payload)
        const refreshtoken = this.jwtService.sign(payload, this.refreshTokenConfig)

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 1000,
        });

        res.cookie('refresh_token', refreshtoken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge:15 * 60 * 1000,
        });

        return {
            "msg": "Loged In Successfully"
        }
    }



    async refreshAccessTokenFromGuard(user: AuthJwtPayload, res: Response) {
        const email = user.sub;

        const newAccessToken = this.jwtService.sign({ sub: email });

        res.cookie('access_token', newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000,
        });

        return { message: 'Access token refreshed' };
    }





}
