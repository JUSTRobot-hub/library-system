import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { StaffModule } from 'src/staff/staff.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { I18nModule } from 'src/i18n/i18n.module';
import { JwtStaffStrategy } from './strategies/staff.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({}),
    StaffModule,
    I18nModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStaffStrategy],
  exports: [AuthService],
})
export class AuthModule {}
