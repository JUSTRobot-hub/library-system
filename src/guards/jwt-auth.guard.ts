import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { StrategyKeyName } from 'src/constants/enum.constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard([StrategyKeyName.STAFF]) {
  constructor(private reflector: Reflector) {
    super();
  }
  // handleRequest(
  //   ...args: Parameters<
  //     InstanceType<ReturnType<typeof AuthGuard>>['handleRequest']
  //   >
  // ) {
  //   console.log(args);
  //   return super.handleRequest(...args);
  // }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}
