interface Token {
  exp: number;
  id: number;
  email: string;
  fullName: string;
  roles: string[];
}

export default Token;
