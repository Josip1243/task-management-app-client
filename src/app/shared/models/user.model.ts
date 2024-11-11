export interface User {
  email: string;
  password: string;
}
export interface RegisterUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface UserDTO {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
}
