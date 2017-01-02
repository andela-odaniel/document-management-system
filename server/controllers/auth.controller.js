import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.SECRET;

/**
 * Validates the JWT attached to the request
 * @exports authorize
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns
 */
export function authorize(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: 'Token authentication failed'
        });
      }
      req.decoded = decoded;
      return next();
    });
  } else {
    return res.status(401).json({
      message: 'Token missing'
    });
  }
}

/**
 * Checks if the current request has an admin role attached
 * @exports isAdmin
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns
 */
export function isAdmin(req, res, next) {
  const role = req.decoded.role;
  if (role && role === 'admin') {
    return next();
  }

  return res.status(403).json({
    message: 'You are not authorized to view the resource'
  });
}
