export type LoginType = {
  data: {
    tokenType: string;
    expiresAt: string;
    accessToken: string;
    refreshToken: string;
  }
}

export type GetProfileType = {
  data: {
    name: string;
    email: string;
  };
};