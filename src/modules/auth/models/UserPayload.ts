export interface UserPayload {
  sub: string;
  email: string;
  cpf?: string;
  cnpj?: string;
  role: string;
  iat?: number;
  exp?: number;
}
