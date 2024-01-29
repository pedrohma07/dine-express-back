// decorator para validar CNPJ
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import * as cpfCnpjValidator from 'cpf-cnpj-validator';

@ValidatorConstraint({ name: 'IsCNPJ', async: false })
export class IsCNPJConstraint implements ValidatorConstraintInterface {
  validate(cnpj: string) {
    return cpfCnpjValidator.cnpj.isValid(cnpj);
  }

  defaultMessage() {
    return 'CNPJ inválido';
  }
}

export function IsCNPJ(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCNPJConstraint,
    });
  };
}
