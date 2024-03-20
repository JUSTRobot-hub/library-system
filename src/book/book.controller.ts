import { Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto, SearchBookDto, UpdateBookDto } from './dto/book.dto';
import { Book } from './entities/book.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import {
  BasicApiSwaggerDecorator,
  DefaultResponseDto,
} from 'src/utils/swagger.utils';
import { BearerAuthPackDecorator } from 'src/utils/nest.utils';
import { OnlyStaff } from 'src/decorators/only-staff.decorator';

@BearerAuthPackDecorator('Book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @BasicApiSwaggerDecorator({
    response: {
      status: 201,
      description: '',
    },
    operation: {
      summary: 'create book',
      description: 'book created successfully',
    },
    isArray: false,
    dto: Book,
  })
  @Post()
  @OnlyStaff()
  async create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @BasicApiSwaggerDecorator({
    response: {
      status: 201,
      description: '',
    },
    operation: {
      summary: 'find all books',
      description: '',
    },
    isArray: true,
    dto: Book,
  })
  @Get()
  @Serialize(Book)
  async findAll() {
    return this.bookService.findAll();
  }

  @BasicApiSwaggerDecorator({
    response: {
      status: 201,
      description: '',
    },
    operation: {
      summary: 'create book',
      description: '',
    },
    isArray: false,
    dto: Book,
  })
  @OnlyStaff()
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @BasicApiSwaggerDecorator({
    response: {
      status: 201,
      description: '',
    },
    operation: {
      summary: 'remove book',
      description: '',
    },
    isArray: false,
    dto: DefaultResponseDto,
  })
  @OnlyStaff()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.bookService.delete(id);
  }

  @BasicApiSwaggerDecorator({
    response: {
      status: 201,
      description: '',
    },
    operation: {
      summary: 'search book',
      description: 'search for a book ',
    },
    isArray: true,
    dto: Book,
  })
  @Post('search')
  @Serialize(Book)
  async search(@Body() searchBookDto: SearchBookDto) {
    return this.bookService.search(searchBookDto);
  }
}
