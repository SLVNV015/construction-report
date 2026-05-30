import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ZodError, type ZodType } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodType) {}

  transform(value: any) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        throw new BadRequestException('Validation failed', error.message);
      }
      throw new BadRequestException(
        'Validation failed',
        error as unknown as Error,
      );
    }
  }
}
