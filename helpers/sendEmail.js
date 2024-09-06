import nodemailer from 'nodemailer';
import 'dotenv/config';

const { GOOGLE_EMAIL, GOOGLE_PASSWORD } = process.env;

const nodemailerConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: GOOGLE_EMAIL,
    pass: GOOGLE_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async data => {
  const email = { ...data, from: GOOGLE_EMAIL };
  const respond = await transport.sendMail(email);
  return respond;
};

export default sendEmail;
