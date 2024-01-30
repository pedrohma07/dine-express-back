export interface UserPayload {
  sub: string;
  email: string;
  cpf?: string;
  cnpj?: string;
  iat?: number;
  exp?: number;
}
