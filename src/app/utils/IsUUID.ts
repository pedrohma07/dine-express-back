import { HttpException, HttpStatus } from '@nestjs/common';

export const isUuid = (str: string) => {
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89ABab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

  const validation = uuidRegex.test(str);

  if (validation) {
    throw new HttpException(
      { message: 'ID informado não é um UUID válido' },
      HttpStatus.BAD_REQUEST,
    );
  }
};
