import inputCheck from 'modules/inputCheck';
import prisma from '../../prisma/context';
import { AccountEntity } from 'entity/AccountEntity';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class AccountService {
  // private readonly prisma: PrismaClient
  constructor() {}
  public async logIn(requestBody: {
    mail: string;
    pw: string;
    temp: number;
  }): Promise<{
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
      token: data.id.toString(),
    };
    //needTokenize
    return result;
  }

  public async longLogIn(requestBody: {
    mail: string;
    pw: string;
    temp: number;
  }): Promise<{
    token: string;
  }> {
    // await sleep(2000); // IO task
    // let temp1 = 0;
    // let temp2 = 0;
    // for (let i = 0; i < 100000; i++) {
    //   // blocking(event loop)
    //   for (let j = 0; j < 100000; j++) {
    //     temp1 += 1;
    //   }
    //   temp1 = 0;
    //   temp2 += 1;
    // }
    await sleep(4000);

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
      token: data.id.toString(),
    };
    //needTokenize
    return result;
  }

  public getAccount: (idx: number) => Promise<AccountEntity>; //use prisma
  // public logIn: (requestBody) => Promise<string>;
}

export default AccountService;
