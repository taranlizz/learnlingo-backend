import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

const signJWT = id => {
  const payload = { id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '23h' });
  return token;
};

export default signJWT;
