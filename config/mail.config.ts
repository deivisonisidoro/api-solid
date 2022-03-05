class Configs {
  public host = process.env.SMTP_PORT;
  public port =  Number(process.env.SMTP_HOST);
  public user = process.env.MAIL_USERNAME;
  public password =process.env.MAIL_PASSWORD;
}

export default new Configs;