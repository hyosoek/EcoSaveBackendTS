import { NotFoundException } from '@modules/customError';
import prisma from '../../prisma/context';

class AccountService {
  // private readonly prisma: PrismaClient
  constructor() {}
  public async logIn(requestBody: { mail: string; pw: string }): Promise<{
    token: string;
  }> {
    const data = await prisma.account.findUnique({
      select: {
        id: true,
      },
      where: {
        mail: requestBody.mail,
        pw: requestBody.pw,
      },
    });

    const result = {
      message: null,
      token: null,
    };

    if (data == null) result.message = 'Invalid user data';
    else result.token = data; // use publish token function

    //needTokenize
    return result;
  }
}

export default AccountService;
