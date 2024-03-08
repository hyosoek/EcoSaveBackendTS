import { Account } from '@prisma/client';

export class AccountEntity {
  idx: number;
  name: string;

  constructor(account: { idx: number; name: string }) {
    this.idx = account.idx;
    this.name = account.name;
  }

  static createAccountEntity(account: Account): AccountEntity {
    return new AccountEntity({
      idx: account.id,
      name: account.nickname,
    });
  }
}

// controller -> service(entity + decoratror) -> repositoiry(entity)
// controller -> service(entitye) -> repositoiry(model)
