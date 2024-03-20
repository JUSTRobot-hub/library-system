import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Staff, StaffDocument } from './entities/staff.entity';
import { Model } from 'mongoose';
import { CreateStaffDto } from './dto/staff.dto';
@Injectable()
export class StaffService {
  constructor(
    @InjectModel(Staff.name) private staffModel: Model<StaffDocument>,
  ) {}

  getStaff() {
    return this.staffModel.find({ removed: false });
  }

  async createStaff(createStaffDto: CreateStaffDto) {
    const isAlreadyExists = await this.findOne({
      removed: false,
      email: createStaffDto.email,
    });

    if (isAlreadyExists) throw new BadRequestException('Email already exists');

    return this.staffModel.create(createStaffDto);
  }

  async updateStaff(id: string, createStaffDto: CreateStaffDto) {
    const isAlreadyExists = await this.findOne({
      removed: false,
      email: createStaffDto.email,
    });

    if (!isAlreadyExists) throw new BadRequestException('Email already exists');

    return this.staffModel.findOneAndUpdate({ _id: id }, createStaffDto);
  }

  async deleteStaff(id: string) {
    return this.staffModel.findOneAndUpdate({ _id: id }, { removed: true });
  }

  findOne(query: any) {
    return this.staffModel.findOne(query);
  }

  create(data: any) {
    return this.staffModel.create(data);
  }
}
