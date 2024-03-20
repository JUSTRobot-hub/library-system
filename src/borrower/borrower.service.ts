import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Borrower, BorrowerDocument } from './entities/borrower.entity';
import { Model } from 'mongoose';
import { CreateBorrowerDto } from './dto/borrower.dto';
import { DefaultResponseDto } from 'src/utils/swagger.utils';

@Injectable()
export class BorrowerService {
  constructor(
    @InjectModel(Borrower.name) private borrowerModel: Model<BorrowerDocument>,
  ) {}

  async create(createBorrowerDto: CreateBorrowerDto) {
    const borrower = await this.borrowerModel.findOne({
      email: createBorrowerDto.email,
      removed: false,
    });
    if (borrower) throw new BadRequestException('Borrower already exists');
    return this.borrowerModel.create(createBorrowerDto);
  }

  async update(id: string, updateBorrowerDto: CreateBorrowerDto) {
    return this.borrowerModel.findByIdAndUpdate(id, updateBorrowerDto, {
      new: true,
    });
  }

  async delete(id: string) {
    await this.borrowerModel.updateOne({ _id: id }, { removed: true });
    return new DefaultResponseDto();
  }

  async findAll() {
    return this.borrowerModel.find({ removed: false });
  }

  async findOne(body: any) {
    return this.borrowerModel.findOne(body);
  }
}
