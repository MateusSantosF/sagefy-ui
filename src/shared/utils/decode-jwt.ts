export const decodeJwt = <T = object>(token: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, base64Payload] = token.split(".");
  const payloadBuffer = Buffer.from(base64Payload, "base64");
  const ret = JSON.parse(payloadBuffer.toString());

  return ret as T;
};
