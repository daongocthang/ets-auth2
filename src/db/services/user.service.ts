import { WhereOptions } from "sequelize";
import User, { UserResult } from "../models/user.model";

export const findOne = async (
  constraints?: WhereOptions
): Promise<UserResult | null> => {
  return await User.findOne({ where: constraints ? constraints : {} });
};
