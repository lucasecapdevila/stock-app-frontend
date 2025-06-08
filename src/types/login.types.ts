export type LoginFormInputs = {
  username: string
  password: string
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface UserSession {
  token: string;
  user: User;
}