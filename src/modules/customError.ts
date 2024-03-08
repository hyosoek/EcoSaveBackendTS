import { HttpStatus } from 'modules/httpStatus';

export class CustomError extends Error {
  status: number = HttpStatus.INTERNAL_SERVER_ERROR;
  constructor(message: string) {
    super(message);
  }
}

export class BadRequestException extends CustomError {
  constructor(message: string = 'BadRequestException') {
    super(message);
    this.status = HttpStatus.BAD_REQUEST;
  }
}

export class UnauthorizedException extends CustomError {
  constructor(message: string = 'UnauthorizedException') {
    super(message);
    this.status = HttpStatus.UNAUTHORIZED;
  }
}

export class NotFoundException extends CustomError {
  constructor(message: string = 'NotFoundException') {
    super(message);
    this.status = HttpStatus.NOT_FOUND;
  }
}

export class ForbiddenException extends CustomError {
  constructor(message: string = 'ForbiddenException') {
    super(message);
    this.status = HttpStatus.FORBIDDEN;
  }
}

export class InternerServerException extends CustomError {
  constructor(message: string = 'InternerServerException') {
    super(message);
    this.status = HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
