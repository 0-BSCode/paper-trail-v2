declare global {
  interface ResponseMessage {
    msg: string;
  }

  interface RequestUser {
    id: string;
    email: string;
    fullName: string;
    roles: Array<string>;
  }

  interface TokenPair {
    accessToken: string;
    refreshToken: string;
  }
}

export { RequestUser };
