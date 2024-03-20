import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { BorrowerService } from './borrower.service';
import { CreateBorrowerDto } from './dto/borrower.dto';
import { Borrower } from './entities/borrower.entity';
import { BearerAuthPackDecorator } from 'src/utils/nest.utils';

@BearerAuthPackDecorator('Borrower')
export class BorrowerController {
  constructor(private readonly borrowerService: BorrowerService) {}

  @Post()
  async create(@Body() createBorrowerDto: CreateBorrowerDto) {
    return this.borrowerService.create(createBorrowerDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBorrowerDto: CreateBorrowerDto,
  ) {
    return this.borrowerService.update(id, updateBorrowerDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.borrowerService.delete(id);
  }

  @Get()
  async findAll(): Promise<Borrower[]> {
    return this.borrowerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Borrower> {
    return this.borrowerService.findOne({ _id: id });
  }
}
