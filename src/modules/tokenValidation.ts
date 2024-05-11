import jwt from 'jsonwebtoken';
import { InternerServerException, UnauthorizedException } from './customError';
import { HttpStatus } from './httpStatus';

const publishToken = async (userData: { id: number }) => {
  try {
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
  } catch (err) {
    // server error to custom error msg
    const error = new InternerServerException('token publish failed');
    throw error;
  }
};

const verifyWithToken = async (req) => {
  try {
    const authorization = await req.headers.authorization;
    jwt.verify(authorization, process.env.JWT_RANDOM);
    const payload = authorization.split('.')[1];
    const data = Buffer.from(payload, 'base64');
    req.decoded = JSON.parse(data.toString());
  } catch (err) {
    const error = new UnauthorizedException('token verify failed');
    throw error;
  }
};

module.exports = { verifyWithToken, publishToken };
