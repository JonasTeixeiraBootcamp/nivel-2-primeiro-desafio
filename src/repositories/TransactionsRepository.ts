import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionPDO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (accumulator, value) => {
        switch (value.type) {
          case 'income':
            accumulator.income += value.value;
            break;

          case 'outcome':
            accumulator.outcome += value.value;
            break;

          default:
        }
        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
      },
    );

    return { ...balance, total: balance.income - balance.outcome };
  }

  public create({ title, value, type }: CreateTransactionPDO): Transaction {
    const transaciton = new Transaction({ title, value, type });

    this.transactions.push(transaciton);

    return transaciton;
  }
}

export default TransactionsRepository;
