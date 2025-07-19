import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/Passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { IsEmail } from "class-validator";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET') || 'default',  
        });
    }

    async validate(payload: any) {
        return {userId: payload.sub, email: payload.email};
    }
}
