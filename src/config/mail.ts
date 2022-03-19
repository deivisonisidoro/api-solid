export default {
  host: process.env.SMTP_HOST,
  port:  Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD, 
  }
};  