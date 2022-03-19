import MailLib from '../lib/Mail';

export default {
  key: 'StaticsUser',
  async handle({data}){
    const {user} = data;
  
    console.log(user);
    
  }
}