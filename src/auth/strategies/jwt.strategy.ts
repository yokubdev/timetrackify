import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Ensure the token is not expired
      secretOrKey: process.env.PRIVATE_KEY || 'secret_of_time_tracker', // Keep your secret safe
    });
  }

  async validate(payload: any) {
    const user = await this.userService.getUserById(payload.sub); // Assuming payload contains userId as "sub"
    if (!user) {
      throw new UnauthorizedException();
    }
    return { id: payload.sub, username: payload.username }; // Attach user details to the request
  }
}
