import { Router } from 'express';
import authentication from '../controllers/auth.controller';
import authSchemas from '../validations/auth.validation';
import validator from '../middleware/validator';

const authRoute = Router();

const { signupSchema } = authSchemas;

authRoute.post(
  '/signup',
  validator(signupSchema),
  authentication.createUser,
);

export default authRoute;
