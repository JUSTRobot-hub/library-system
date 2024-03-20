import { Get, Post, Body, UseGuards, Response, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { Staff, StaffDocument } from 'src/staff/entities/staff.entity';
import { BasicApiSwaggerDecorator } from 'src/utils/swagger.utils';
import { BearerAuthPackDecorator } from 'src/utils/nest.utils';
import { AdminSigninDto } from './dto/auth.dto';
import { GetUser } from 'src/decorators/get-user.decorator';
import { Public } from 'src/decorators/public.decorator';

@BearerAuthPackDecorator('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Serialize(Staff)
  @Get('/me')
  async validation(@GetUser() user: StaffDocument) {
    return user;
  }

  @BasicApiSwaggerDecorator({
    response: {
      status: 201,
      description: '',
    },
    operation: {
      summary: 'Admin login',
      description: 'admin logged in successfully',
    },
    isArray: false,
    dto: Staff,
  })
  @Serialize(Staff)
  @Public()
  @Post('/admin-login')
  async adminSignin(@Body() body: AdminSigninDto) {
    return await this.authService.adminSignin(body);
  }
}
