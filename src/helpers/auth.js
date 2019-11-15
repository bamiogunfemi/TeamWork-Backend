import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

config();
const salt = +process.env.SALT;
const secret = process.env.TOKEN_SECRET;

export const generateToken = (payload) => {
  const token = jwt.sign(payload, secret, { expiresIn: '24h' });
  return token;
};

export const hashPassword = (password) => bcrypt.hashSync(password, salt);

export const verifyPassword = (password, hash) => bcrypt.compareSync(password, hash);

export default { generateToken, hashPassword, verifyPassword };
