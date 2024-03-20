import { Module } from '@nestjs/common';
import { APP_GUARD, ContextIdFactory } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { StaffModule } from './staff/staff.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AggregateByLocaleContextIdStrategy } from './core/aggregate-by-locale.strategy';
import { BookModule } from './book/book.module';
import { BorrowerModule } from './borrower/borrower.module';
import { BorrowerProcessModule } from './borrower-process/borrower-process.module';

ContextIdFactory.apply(new AggregateByLocaleContextIdStrategy());

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV.toLowerCase()}`,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    StaffModule,
    BookModule,
    BorrowerModule,
    BorrowerProcessModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
