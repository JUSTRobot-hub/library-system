import { Module, forwardRef } from '@nestjs/common';
import { BorrowerProcessService } from './borrower-process.service';
import { BorrowerProcessController } from './borrower-process.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Checkout, CheckoutSchema } from './entities/checkout.entity';
import { BorrowerModule } from 'src/borrower/borrower.module';
import { BookModule } from 'src/book/book.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Checkout.name, schema: CheckoutSchema },
    ]),
    BookModule,
    BorrowerModule,
  ],
  controllers: [BorrowerProcessController],
  providers: [BorrowerProcessService],
})
export class BorrowerProcessModule {}
