import { Controller, Get, Post, Body, Put, Param, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.model';
import { Book as BookEntity } from './book.entity';
import { CreateBookDTO } from './dtos/create-book.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateBookDTO } from './dtos/update-book.dto';
import { QueryBookDto } from './dtos/query-book.dto';
// import { CreateBookDTO } from './dtos/create-book.dto';
@ApiBearerAuth()
@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: [CreateBookDTO],
    description: 'The record has been successfully created.',
  })
  getBooks(@Query() query: QueryBookDto): Book[] {
    console.log('query is', query);
    return this.bookService.getAllBooks(query);
  }

  @Post()
  @ApiResponse({
    status: 201,
    type: CreateBookDTO,
    description: 'The record has been successfully created.',
  })
  async addBook(@Body() book: CreateBookDTO): Promise<BookEntity> {
    console.log('in book controller', book);
    // console.log(typeof likes === 'number');

    return this.bookService.addBook(book);
  }
  @Put(':name')
  @ApiResponse({
    status: 201,
    type: UpdateBookDTO,
    description: 'new updated record',
  })
  updateBook(@Param('name') name: string, @Body() book: UpdateBookDTO): Book {
    console.log('in book controller update', book);
    // console.log(typeof likes === 'number');

    return this.bookService.updateBook(name, book);
  }
}
