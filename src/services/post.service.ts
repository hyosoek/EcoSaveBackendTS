import { PrismaClient } from '@prisma/client';

export class PostService {
  constructor(private readonly prisma: PrismaClient) {}

  public getPostByUserIdx: (userIdx: number) => Promise<Object>;

  public getPostAll: (pageIdx: number) => Promise<Object>;
}
