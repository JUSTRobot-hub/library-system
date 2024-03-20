import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './entities/book.entity';
import { Model } from 'mongoose';
import { CreateBookDto, SearchBookDto, UpdateBookDto } from './dto/book.dto';
import { DefaultResponseDto } from 'src/utils/swagger.utils';
import { searchTransformer } from 'src/utils/mongoose.utils';
@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async create(createBookDto: CreateBookDto) {
    const findBook = await this.bookModel.findOne({
      ISBN: createBookDto.ISBN,
      removed: false,
    });
    if (findBook) throw new BadRequestException('Book already exists');
    return this.bookModel.create(createBookDto);
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    await this.bookModel.updateOne({ _id: id }, { $set: updateBookDto });
    return new DefaultResponseDto();
  }

  findAll() {
    return this.bookModel.find({ removed: false });
  }

  async search(searchBookDto: SearchBookDto) {
    const query = searchTransformer(searchBookDto);

    return this.bookModel.find({
      removed: false,
      $or: Array.from(Object.entries(query)).map(([key, value]) => ({
        [key]: value,
      })),
    });
  }

  async delete(id: string) {
    await this.bookModel.updateOne({ _id: id }, { $set: { removed: true } });
    return new DefaultResponseDto();
  }

  async findOne(body: any) {
    return this.bookModel.findOne(body);
  }
}
