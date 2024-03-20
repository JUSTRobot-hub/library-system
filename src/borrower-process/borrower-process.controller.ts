import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { BorrowerProcessService } from './borrower-process.service';
import { CreateCheckoutDto } from './dto/checkout.dto';
import { BearerAuthPackDecorator } from 'src/utils/nest.utils';
import { StaffDocument } from 'src/staff/entities/staff.entity';
import { GetUser } from 'src/decorators/get-user.decorator';
import { Public } from 'src/decorators/public.decorator';

@BearerAuthPackDecorator('BorrowerProcess')
export class BorrowerProcessController {
  constructor(
    private readonly borrowerProcessService: BorrowerProcessService,
  ) {}

  @Post('checkout-book')
  async checkoutBook(
    @Body() createCheckoutDto: CreateCheckoutDto,
    @GetUser() user: StaffDocument,
  ) {
    return this.borrowerProcessService.checkoutBook(createCheckoutDto, user);
  }

  @Post('return-book/:id')
  async returnBook(@Param('id') id: string) {
    return this.borrowerProcessService.returnBook(id);
  }

  @Get('currently-borrowed-books')
  @Public()
  async getCurrentlyBorrowedBooks(@Query('email') email: string) {
    return this.borrowerProcessService.getCurrentlyBorrowedBooks(email);
  }

  @Get('export-borrowing-process-data')
  async exportBorrowingProcessData(@Res() res: Response) {
    const filePath =
      await this.borrowerProcessService.exportBorrowingProcessData();
    return res.download(filePath, `BorrowingProcesses.xlsx`);
  }

  @Get('export-overdue-borrows')
  async exportOverdueBorrows(@Res() res: Response) {
    const filePath = await this.borrowerProcessService.exportOverdueBorrows();
    return res.download(filePath, `OverdueBorrows.xlsx`);
  }

  @Get('export-borrowing-processes-last-month')
  async exportBorrowingProcessesLastMonth(@Res() res: Response) {
    const filePath =
      await this.borrowerProcessService.exportBorrowingProcessesLastMonth();
    return res.download(filePath, `BorrowingProcessesLastMonth.xlsx`);
  }
}
