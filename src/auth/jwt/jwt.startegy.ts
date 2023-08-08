import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy , ExtractJwt} from 'passport-jwt' ; 
import { AuthService } from "../auth.service";
import { JwtPayload } from "./jwt.payload";

@Injectable()
export class JwtStartegy extends PassportStrategy(Strategy){
    constructor(
        private readonly authService:AuthService , 
        private readonly configService:ConfigService , 
    ){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            secretOrKey : configService.get<string>("JWT_SECRET_KEY"),
        })
    }

    async validate(jwtPayload:JwtPayload){
        const user = await this.authService.validateUser(jwtPayload) ;

        return user ; 
    }
}