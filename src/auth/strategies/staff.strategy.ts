import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { StrategyKeyName } from 'src/constants/enum.constants';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class JwtStaffStrategy extends PassportStrategy(
  Strategy,
  StrategyKeyName.STAFF,
) {
  constructor(private moduleRef: ModuleRef) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: any) {
    const authService = await this.moduleRef.resolve(AuthService);

    const staff = await authService.staffService.findOne({
      _id: payload._id,
      removed: false,
    });
    if (!staff) {
      throw new UnauthorizedException('Invalid Token');
    }

    return staff;
  }
}
