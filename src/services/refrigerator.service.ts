import { NotFoundException } from '@modules/customError';
import prisma from '../../prisma/context';
import { Sql } from '@prisma/client/runtime/library';

class RefrigeratorService {
  // private readonly prisma: PrismaClient
  constructor() {}
  public async search(id: number): Promise<{
    token: string;
  }> {
    const data = // any type should be dto
      await prisma.$queryRaw<unknown>`SELECT subquery.energy, subquery.distance AS distance
      FROM (
          SELECT 
              b.energy,
              ((a.latitude - (SELECT latitude FROM account WHERE id = 500000))^2 +        
              (a.longitude - (SELECT longitude FROM account WHERE id = 500000))^2) as distance
          FROM 
              account a                                                              
          JOIN                                                                   
              refrigerator b 
          ON 
              a.id = b.account_id
          ORDER BY 
              ((a.latitude - (SELECT latitude FROM account WHERE id = 500000))^2 +        
              (a.longitude - (SELECT longitude FROM account WHERE id = 500000))^2)
          LIMIT 100 OFFSET 0
      ) AS subquery
      ORDER BY 
          subquery.energy;`;

    const result = {
      message: null,
      token: null,
    };

    if (data == null) result.message = 'Invalid user data';
    else result.token = data; // use publish token function

    //needTokenize
    return result;
  }

  public async gistSearch(id: number): Promise<{
    token: string;
  }> {
    const data = null;

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
