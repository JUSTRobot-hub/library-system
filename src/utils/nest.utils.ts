import { applyDecorators, Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

export function BearerAuthPackDecorator(name: string) {
  return applyDecorators(
    Controller(name.toLowerCase()),
    ApiBearerAuth(),
    ApiTags(name),
  );
}
