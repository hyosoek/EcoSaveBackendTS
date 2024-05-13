import jwt from 'jsonwebtoken';

export const publishToken = async (userData: {
  id: number;
}): Promise<string> => {
  const token = jwt.sign(
    {
      id: userData.id, //payload
    },
    process.env.JWT_RANDOM,
    {
      issuer: 'hyoseok',
      expiresIn: process.env.JWT_TOKEN_EXPIRE_TIME + 's',
    }
  );
  return token;
};

export const decodeToken = async (token: string): Promise<string> => {
  jwt.verify(token, process.env.JWT_RANDOM);
  const payload = token.split('.')[1];
  const data = Buffer.from(payload, 'base64');
  return JSON.parse(data.toString());
};
