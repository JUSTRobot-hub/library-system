import { HttpStatus, Version, applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiProperty,
  ApiPropertyOptions,
  ApiResponse,
  ApiResponseOptions,
} from '@nestjs/swagger';
import { ClassConstructor, Exclude, Expose } from 'class-transformer';
import { IsMongoId } from 'class-validator';

type CustomApiResponseDataType = {
  [key: string]: any;
};

class ParamsDto {
  apiVersion?: string = '1';
  response: {
    status: number;
    description: string;
  };
  isArray: boolean;
  operation: {
    summary: string;
    deprecated?: boolean;
    description?: string;
  };

  dto: ClassConstructor<any> | CustomApiResponseDataType;
}

class ErrorClass {
  @ApiProperty({
    type: Number,
    name: 'statusCode',
    description: 'error statusCode',
    example: 0,
  })
  statusCode: number;

  @ApiProperty({
    type: String,
    name: 'type',
    description: 'error type',
    example: 'Error',
  })
  type: string;

  @ApiProperty({
    type: String,
    name: 'message',
    description: 'error message',
    example: 'Error message',
  })
  message: string;
}

export class DefaultResponseDto {
  @ApiProperty({
    type: String,
    name: 'status',
    description: 'Status of the response',
    example: 'OK',
  })
  status: string = 'OK';

  @ApiProperty({
    type: Number,
    name: 'statusCode',
    description: 'Status code of the response',
    example: 200,
  })
  statusCode: number = 200;

  @ApiProperty({
    type: String,
    name: 'message',
    description: 'Message of the response',
    example: 'Resource retrieved successfully',
  })
  message: string = 'Operation completed successfully';

  @ApiProperty({
    type: String,
    name: 'data',
    description: 'Data of the response',
    example: 'custom string',
  })
  data: string = null;
}

export class MongoIdParam {
  @IsMongoId()
  @ApiProperty({
    type: String,
    name: 'id',
    description: 'Mongo id of the resource',
    example: '5f5f5f5f5f5f5f5f5f5f5f5f',
  })
  id: string;
}

export function BasicApiPropertyDecorator(options: {
  showInSerializer: boolean;
  swagger: ApiPropertyOptions;
  implementClass?: ClassConstructor<any> | string;
}) {
  return applyDecorators(
    options.showInSerializer ? Expose() : Exclude(),
    ApiProperty({
      required: false,
      example:
        typeof options.implementClass == 'function'
          ? new options.implementClass()
          : options.implementClass,
      ...options.swagger,
    }),
  );
}

export function BasicApiSwaggerDecorator(ParamsDto: ParamsDto) {
  let customResponse =
    typeof ParamsDto.dto == 'object'
      ? {
          isArray: ParamsDto.isArray,
          status: ParamsDto.response.status,
          description: `${ParamsDto.response.status} - ${ParamsDto.response.description}`,
          schema: {
            example: ParamsDto.dto,
          },
        }
      : {
          type: ParamsDto.dto,
          isArray: ParamsDto.isArray,
          status: ParamsDto.response.status,
          description: `${ParamsDto.response.status} - ${ParamsDto.response.description}`,
        };

  return applyDecorators(
    ApiOperation(ParamsDto.operation),
    ApiResponse(customResponse),
    ApiResponse({
      type: ErrorClass,
      status: 0,
      description: `${HttpStatus.BAD_REQUEST} - Bad Request || ${HttpStatus.NOT_FOUND} - Not Found || ${HttpStatus.FORBIDDEN} - Forbidden || ${HttpStatus.INTERNAL_SERVER_ERROR} - Internal Server Error`,
    }),
    Version(ParamsDto.apiVersion),
  );
}
