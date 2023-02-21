import {plainToClass} from '@nestjs/class-transformer';
import {validateSync} from '@nestjs/class-validator';
import {ClassConstructor} from '@nestjs/class-transformer/types/interfaces';

export const validationEnv =
  <T extends object>(values: ClassConstructor<T>) =>
  (
    config: Record<string, unknown>
  ): {
    error: Error;
    value: T;
  } => {
    const validatedConfig = plainToClass(values, config, {
      enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });

    return {
      error: errors.length > 0 ? new Error(errors.toString()) : null,
      value: validatedConfig,
    };
  };
