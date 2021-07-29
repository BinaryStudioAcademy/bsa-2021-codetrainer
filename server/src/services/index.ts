import { Auth, TAuth } from './auth';
import { UserRepository } from '../data';

const auth = new Auth({ user: UserRepository });

export { auth, TAuth };
