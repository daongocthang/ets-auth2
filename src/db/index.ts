import User from "./models/user.model";

const developing = process.env.NODE_ENV === "development";

const dbInit = () => {
  User.sync({ alter: developing });
};

export default dbInit;
