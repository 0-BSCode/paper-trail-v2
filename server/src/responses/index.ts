const emailNotVerified: Array<ResponseMessage> = [{ msg: "Please verify your email before logging in." }];
const userNotFound: Array<ResponseMessage> = [
  {
    msg: "Your email or password is incorrect"
  }
];

export { emailNotVerified, userNotFound };
