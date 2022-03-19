import MailLib from '../lib/Mail';

export default {
  key: 'RegistrationMail',
  async handle({data}){
    const {user} = data;
  
    await MailLib.sendMail({
      to: `${user.name} <${user.email}>`,
      from:'Team My App <team@myapp.com>',
      subject: 'Welcome to my app',
      html: '<p>You can log in to the app.</p>'
    })
  }
}