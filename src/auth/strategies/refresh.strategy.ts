import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
// import { AuthJwtPayload } from "../types/auth.jwtPayload";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy,"refresh-jwt"){
  constructor(){
   super({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.REFRESH_JWT_SECRET as string, 
   ignoreExpiration :false
})

  }
  validate(payload:string){
    return {payload}
  }
}