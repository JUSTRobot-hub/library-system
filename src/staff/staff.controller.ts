import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { BearerAuthPackDecorator } from 'src/utils/nest.utils';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { Staff } from './entities/staff.entity';
import { CreateStaffDto } from './dto/staff.dto';
import { BasicApiSwaggerDecorator } from 'src/utils/swagger.utils';
import { OnlyStaff } from 'src/decorators/only-staff.decorator';
import { Public } from 'src/decorators/public.decorator';

@BearerAuthPackDecorator('Staff')
@OnlyStaff()
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @BasicApiSwaggerDecorator({
    response: {
      status: 201,
      description: '',
    },
    operation: {
      summary: 'create staff',
      description: 'staff created successfully',
    },
    isArray: false,
    dto: Staff,
  })
  @Serialize(Staff)
  @Post('/create-staff')
  async signup(@Body() body: CreateStaffDto) {
    return await this.staffService.createStaff(body);
  }

  @BasicApiSwaggerDecorator({
    response: {
      status: 201,
      description: '',
    },
    operation: {
      summary: 'staff list',
      description: 'staff list',
    },
    isArray: true,
    dto: Staff,
  })
  @Serialize(Staff)
  @Get('/all')
  async getStaff() {
    return await this.staffService.getStaff();
  }

  @BasicApiSwaggerDecorator({
    response: {
      status: 201,
      description: '',
    },
    operation: {
      summary: 'update staff',
      description: 'staff updated successfully',
    },
    isArray: false,
    dto: Staff,
  })
  @Serialize(Staff)
  @Put('/update-staff/:id')
  async updateStaff(@Body() body: CreateStaffDto, @Param('id') id: string) {
    return await this.staffService.updateStaff(id, body);
  }
}
