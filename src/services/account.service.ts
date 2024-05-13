import { UnauthorizedException } from '@modules/customError';
import prisma from '../../prisma/context';
import { publishToken } from '@modules/token';
import { Response } from 'express';

class AccountService {
  // private readonly prisma: PrismaClient
  constructor() {}
  public async logIn(requestBody: { mail: string; pw: string }, res: Response) {
    const data = await prisma.account.findUnique({
      select: {
        id: true,
      },
      where: {
        mail: requestBody.mail,
        pw: requestBody.pw,
      },
    });

    if (data == null) {
      const err = new UnauthorizedException('login failed');
      throw err;
    } else {
      const token = await publishToken(data);
      console.log(token);
      res.setHeader(
        'Set-Cookie',
        'token=' +
          token +
          '; ' +
          'Path=/;' +
          'Domain=localhost; ' +
          'HttpOnly; ' +
          'Max-Age=604800; '
      );
    }

    //needTokenize
  }
}

export default AccountService;
