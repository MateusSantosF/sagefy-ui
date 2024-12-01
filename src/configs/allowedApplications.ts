export interface IAllowedApplication {
  applicationURI: string;
}

export const allowedOrigins: IAllowedApplication[] = [
  {
    applicationURI: "http://127.0.0.1:5500",
  },
  {
    applicationURI: "http://127.0.0.1:4200",
  },
  {
    applicationURI: "http://localhost:3000",
  },
];
