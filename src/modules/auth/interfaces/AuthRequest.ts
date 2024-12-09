export type AuthRequest = {
  email: string;
  password?: string;
  accessCode?: string;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};
