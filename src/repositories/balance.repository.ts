import { BaseRepository } from "./base.repository";
import { BalanceResponse } from "../models/balance.model";

export class BalanceRepository extends BaseRepository {
  async getBalance(): Promise<BalanceResponse> {
    return this.get<BalanceResponse>("/v1/credit-balance");
  }
}
