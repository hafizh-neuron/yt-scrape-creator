import { BalanceRepository } from "../repositories/balance.repository";
import { ApiConfig } from "../models/api.model";
import { BalanceResponse } from "../models/balance.model";

export class BalanceService {
  private balanceRepo: BalanceRepository;

  constructor(config: ApiConfig) {
    this.balanceRepo = new BalanceRepository(config);
  }

  async getBalance(): Promise<BalanceResponse> {
    return this.balanceRepo.getBalance();
  }
}
