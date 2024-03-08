import validator from 'validator';
import regexPatterns from 'modules/regex';
import { BadRequestException } from 'modules/customError';

class InputCheck {
  // Don't use any type. We use unknown.
  input: unknown;
  constructor(input: unknown) {
    this.input = input;
  }

  isNotEmpty = () => {
    // combine all 'invalid type inputCheck' process (Can use module Individually)
    return this.isNotBlank().isNotNull().isNotUndefined();
  };

  isNotBlank = () => {
    if (this.input === '') this.goError('input is "" ');
    return this;
  };

  isNotNull = () => {
    if (this.input === null) this.goError('input is null');
    return this;
  };

  isNotUndefined = () => {
    if (this.input === undefined) this.goError('input is undefined');
    return this;
  };

  isLength = ({ min, max }: { min?: number; max?: number }) => {
    if (!(typeof this.input === 'string'))
      this.goError(this.input + ' is not string input');
    else {
      if (
        (min !== undefined && this.input.length < min) ||
        (max !== undefined && this.input.length > max)
      )
        this.goError(this.input + ' is out of length');
    }
    return this;
  };

  isMail = () => {
    if (!(typeof this.input === 'string' && validator.isEmail(this.input)))
      this.goError(this.input + ' is not mail type input');
    return this;
  };

  isContact = () => {
    if (
      // !(typeof this.input === 'string' && validator.isMobilePhone(this.input))
      // We want to save Phone number with only number. (validator's isMobilePhone includes symbold such '-')
      !(
        typeof this.input === 'string' && regexPatterns.contact.test(this.input)
      )
    )
      this.goError(this.input + ' is not contact type input');
    return this;
  };

  isDate = () => {
    if (
      //!(typeof this.input === 'string' && validator.isDate(this.input))
      // We want to save Date with PostgreSQL date type. (postgre's date column divides Y/M/D with only '-' not '/')
      !(typeof this.input === 'string' && regexPatterns.date.test(this.input))
    )
      this.goError(this.input + ' is not date type input');
    return this;
  };

  isIP = () => {
    if (!(typeof this.input === 'string' && validator.isIP(this.input)))
      this.goError(this.input + ' is not IP type input');
    return this;
  };

  isEqual = (input2: any) => {
    if (this.input !== input2) this.goError(this.input + ' is not same input');
    return this;
  };

  isInt = () => {
    if (
      !(
        typeof this.input === 'number' && validator.isInt(this.input.toString())
      )
    )
      this.goError(this.input + ' is not int type input');
    return this;
  };

  isFloat = () => {
    if (
      !(
        typeof this.input === 'number' &&
        validator.isFloat(this.input.toString())
      )
    )
      this.goError(this.input + ' is not float type input');
    return this;
  };

  goError = (message: string) => {
    throw new BadRequestException(message);
  };
}

const inputCheck = (input: unknown) => {
  return new InputCheck(input);
};

export default inputCheck;
