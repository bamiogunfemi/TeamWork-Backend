import { matchedData, validationResult } from 'express-validator';
import Response from '../helpers/response';

const response = new Response();

export default (schemas) => {
  const validationCheck = (req, res, next) => {
    const errors = validationResult(req);
    // eslint-disable-next-line no-param-reassign
    req = { ...req, ...matchedData(req) };

    if (!errors.isEmpty()) {
      const mapErrors = Object.entries(errors.mapped()).reduce(
        (accumulator, [key, value]) => {
          accumulator[key] = value.msg;
          return accumulator;
        }, {},
      );
      response.setError(400, mapErrors);
      return response.send(res);
    }

    return next();
  };
  return [...(schemas.length && [schemas]), validationCheck];
};
