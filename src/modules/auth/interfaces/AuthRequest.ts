export type AuthRequest = {
  email: string;
  password?: string;
  accessCode?: string;
  classCode?: string;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};
