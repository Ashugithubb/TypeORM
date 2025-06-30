import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RefreshGuardGuard } from './guards/refresh-auth/refresh-guard.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Body() { email, password }) {
        return this.authService.login(email);
    }

    
    @UseGuards(RefreshGuardGuard)
    @Post("refresh")
    refreshToken(@Req() req) {
        const authHeader = req.headers['authorization'];
        const refreshToken = authHeader?.replace('Bearer ', '');
        // console.log('Refresh Token:', refreshToken);
        return this.authService.refreshAccessToken(refreshToken);
    }
}
