import { Service } from 'typedi';
import prisma from '../../prisma/context';
import pgPool from '@configs/database/postgreSQL';

@Service()
class RefrigeratorService {
  // private readonly prisma: PrismaClient
  constructor() {}
  public async search(id: number): Promise<{
    token: string;
  }> {
    const data = // any type should be dto
      await prisma.$queryRaw<unknown>`SELECT subquery.nickname
      FROM (
          SELECT 
              a.id,
              a.nickname,
              b.energy,
              ((a.latitude - (SELECT latitude FROM account WHERE id = ${id}))^2 +        
              (a.longitude - (SELECT longitude FROM account WHERE id = ${id}))^2) as distance
          FROM 
              account a                                                              
          JOIN                                                                   
              refrigerator b 
          ON 
              a.id = b.account_id
          ORDER BY 
              ((a.latitude - (SELECT latitude FROM account WHERE id = ${id}))^2 +        
              (a.longitude - (SELECT longitude FROM account WHERE id = ${id}))^2)
          LIMIT 100 OFFSET 0
      ) AS subquery
      ORDER BY 
          id;`;

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
    const sql = `SELECT nickname
    FROM account
    WHERE id IN (
        SELECT account_id
        FROM refrigerator
        ORDER BY location::geometry <-> ST_SetSRID(ST_MakePoint((SELECT longitude FROM account WHERE id = ${id}),(SELECT latitude FROM account WHERE id = ${id})), 4326)
        LIMIT 100
    )
    ORDER BY id;`;

    const data = await pgPool.query(sql);

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
