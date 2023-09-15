import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { RegisterDto } from '../register.dto';

@ValidatorConstraint({ name: 'IsEmailOrPhone', async: false })
export class IsEmailOrPhoneConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const { object } = args as { object: RegisterDto };

    if (!object.email && !object.phone) {
      return false; // Neither email nor phone is provided, so it's invalid
    }

    if (object.email && object.phone) {
      return false; // Both email and phone are provided, which is also invalid
    }

    return true; //
  }

  defaultMessage(args: ValidationArguments) {
    return 'email or phone is required';
  }
}
