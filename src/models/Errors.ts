import { ValidationError } from 'sequelize';

export class BaseError extends Error {
  status: number;

  isOperational: boolean;

  errors: ValidationError | undefined;

  constructor(message: string | undefined, status: number, errors?: ValidationError, isOperational = true) {
    super(message);
    this.status = status;
    this.errors = errors;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, BaseError.prototype);
  }
}
