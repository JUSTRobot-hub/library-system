import { Module, forwardRef } from '@nestjs/common';
import { BorrowerService } from './borrower.service';
import { BorrowerController } from './borrower.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Borrower, BorrowerSchema } from './entities/borrower.entity';
import { BorrowerProcessModule } from 'src/borrower-process/borrower-process.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Borrower.name, schema: BorrowerSchema },
    ]),
  ],
  controllers: [BorrowerController],
  providers: [BorrowerService],
  exports: [BorrowerService],
})
export class BorrowerModule {}
