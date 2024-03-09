import { NotFoundException } from '@modules/customError';
import prisma from '../../prisma/context';
import { Sql } from '@prisma/client/runtime/library';

class RefrigeratorService {
  // private readonly prisma: PrismaClient
  constructor() {}
  public async search(id: number): Promise<{
    token: string;
  }> {
    console.log('??');
    const data =
      await prisma.$queryRaw<any>`SELECT * FROM account WHERE id < 10;`;

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

export default RefrigeratorService;
