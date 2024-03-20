import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Checkout, CheckoutDocument } from './entities/checkout.entity';
import { Model, Types } from 'mongoose';
import { CreateCheckoutDto } from './dto/checkout.dto';
import { BorrowerService } from 'src/borrower/borrower.service';
import { BookService } from 'src/book/book.service';
import { exportData } from 'src/utils/xlsx.utils';
import { StaffDocument } from 'src/staff/entities/staff.entity';

@Injectable()
export class BorrowerProcessService {
  constructor(
    @InjectModel(Checkout.name) private checkoutModel: Model<CheckoutDocument>,
    private borrowerService: BorrowerService,
    private bookService: BookService,
  ) {}

  async checkoutBook(
    createCheckoutDto: CreateCheckoutDto,
    user: StaffDocument,
  ) {
    const book = await this.bookService.findOne({
      _id: createCheckoutDto.book,
      removed: false,
    });
    if (!book) throw new NotFoundException('Book not found');

    const checkoutBooks = await this.checkoutModel.countDocuments({
      book: createCheckoutDto.book,
      returned: false,
      removed: false,
    });

    if (checkoutBooks >= book.stock)
      throw new BadRequestException('Book not available');

    return this.checkoutModel.create({ ...createCheckoutDto, staff: user._id });
  }

  returnBook(id: string) {
    return this.checkoutModel.findByIdAndUpdate(
      id,
      { returned: true },
      { new: true },
    );
  }

  async getCurrentlyBorrowedBooks(email: string) {
    const borrower = await this.borrowerService.findOne({
      email,
      removed: false,
    });
    if (!borrower) throw new NotFoundException('Borrower not found');

    return await this.checkoutModel.aggregate([
      {
        $match: {
          borrower: borrower._id,
          returned: false,
        },
      },
      {
        $lookup: {
          from: 'books',
          localField: 'book',
          foreignField: '_id',
          as: 'book',
        },
      },
      {
        $unwind: { path: '$book' },
      },
      {
        $lookup: {
          from: 'borrowers',
          localField: 'borrower',
          foreignField: '_id',
          as: 'borrower',
        },
      },
      { $unwind: { path: '$borrower' } },
      {
        $lookup: {
          from: 'staffs',
          localField: 'staff',
          foreignField: '_id',
          as: 'staff',
        },
      },
      { $unwind: { path: '$staff' } },
      {
        $project: {
          _id: 1,
          dueDate: 1,
          book: {
            _id: 1,
            title: 1,
          },
          borrower: {
            _id: 1,
            email: 1,
          },
          staff: {
            _id: 1,
            email: 1,
          },
        },
      },
    ]);
  }

  async getOverdueBooks() {
    return this.checkoutModel.aggregate([
      {
        $match: {
          removed: false,
          returned: false,
          dueDate: { $lt: new Date() },
        },
      },
      {
        $lookup: {
          from: 'books',
          localField: 'book',
          foreignField: '_id',
          as: 'book',
        },
      },
      { $unwind: { path: '$book' } },
      {
        $lookup: {
          from: 'borrowers',
          localField: 'borrower',
          foreignField: '_id',
          as: 'borrower',
        },
      },
      { $unwind: { path: '$borrower' } },
      {
        $project: {
          _id: 1,
          dueDate: 1,
          book: {
            _id: 1,
            title: 1,
          },
          borrower: {
            _id: 1,
            email: 1,
          },
        },
      },
    ]);
  }

  async exportBorrowingProcessData() {
    const data = await this.checkoutModel.aggregate([
      {
        $lookup: {
          from: 'borrowers',
          localField: 'borrower',
          foreignField: '_id',
          as: 'borrowerInfo',
        },
      },
      { $unwind: { path: '$borrowerInfo' } },
      {
        $lookup: {
          from: 'books',
          localField: 'book',
          foreignField: '_id',
          as: 'bookInfo',
        },
      },
      { $unwind: { path: '$bookInfo' } },
      {
        $lookup: {
          from: 'staffs',
          localField: 'staff',
          foreignField: '_id',
          as: 'staffInfo',
        },
      },
      { $unwind: { path: '$staffInfo' } },
      {
        $project: {
          _id: { $toString: '$_id' },
          borrower: '$borrowerInfo.name',
          book: '$bookInfo.name',
          staff: '$staffInfo.name',
          dueDate: 1,
          returned: 1,
          createdAt: 1,
        },
      },
    ]);

    return exportData(data, 'BorrowingProcesses');
  }

  async exportOverdueBorrows() {
    const currentDate = new Date();
    const data = await this.checkoutModel.aggregate([
      {
        $match: {
          dueDate: { $lt: currentDate },
          returned: false,
          removed: false,
        },
      },
      {
        $lookup: {
          from: 'borrowers',
          localField: 'borrower',
          foreignField: '_id',
          as: 'borrowerInfo',
        },
      },
      { $unwind: { path: '$borrowerInfo' } },
      {
        $lookup: {
          from: 'books',
          localField: 'book',
          foreignField: '_id',
          as: 'bookInfo',
        },
      },
      { $unwind: { path: '$bookInfo' } },
      {
        $lookup: {
          from: 'staffs',
          localField: 'staff',
          foreignField: '_id',
          as: 'staffInfo',
        },
      },
      { $unwind: { path: '$staffInfo' } },
      {
        $project: {
          _id: { $toString: '$_id' },
          borrower: '$borrowerInfo.name',
          book: '$bookInfo.name',
          staff: '$staffInfo.name',
          dueDate: 1,
          returned: 1,
          createdAt: 1,
        },
      },
    ]);

    return exportData(data, 'OverdueBorrows');
  }

  async exportBorrowingProcessesLastMonth() {
    const currentDate = new Date();
    const lastMonthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1,
    );
    const data = await this.checkoutModel.aggregate([
      {
        $match: {
          createdAt: { $gte: lastMonthDate, $lt: currentDate },
          returned: false,
          removed: false,
        },
      },
      {
        $lookup: {
          from: 'borrowers',
          localField: 'borrower',
          foreignField: '_id',
          as: 'borrowerInfo',
        },
      },
      { $unwind: { path: '$borrowerInfo' } },
      {
        $lookup: {
          from: 'books',
          localField: 'book',
          foreignField: '_id',
          as: 'bookInfo',
        },
      },
      { $unwind: { path: '$bookInfo' } },
      {
        $lookup: {
          from: 'staffs',
          localField: 'staff',
          foreignField: '_id',
          as: 'staffInfo',
        },
      },
      { $unwind: { path: '$staffInfo' } },
      {
        $project: {
          _id: { $toString: '$_id' },
          borrower: '$borrowerInfo.name',
          book: '$bookInfo.name',
          staff: '$staffInfo.name',
          dueDate: 1,
          returned: 1,
          createdAt: 1,
        },
      },
    ]);

    return exportData(data, 'BorrowingProcessesLastMonth');
  }
}
