import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StaffService } from 'src/staff/staff.service';
import { AdminSigninDto, SigninDto, SignupDto } from './dto/auth.dto';
import { StaffDocument } from 'src/staff/entities/staff.entity';
import { I18nService } from 'src/i18n/i18n.service';

@Injectable()
export class AuthService {
  constructor(
    public staffService: StaffService,
    private jwtService: JwtService,
    private i18nService: I18nService,
  ) {}

  generateToken(user: StaffDocument) {
    const payload = { _id: user._id };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
  }

  async adminSignin(adminSignin: AdminSigninDto) {
    const user = await this.staffService.findOne({
      email: adminSignin.email,
      removed: false,
    });

    if (!user || !(await user.passwordCheck(adminSignin.password)))
      throw new NotFoundException(
        this.i18nService.translate('USER.INVALID_CREDENTIALS'),
      );

    user.token = this.generateToken(user);

    return user;
  }
}
