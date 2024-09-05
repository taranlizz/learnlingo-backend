import sgMail from '@sendgrid/mail';
import 'dotenv/config';

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = data => {
  const email = { ...data, from: 'learnlingoinc@gmail.com' };
  sgMail.send(email);
  return true;
};

export default sendEmail;
