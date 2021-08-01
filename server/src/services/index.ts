import { Auth, TAuth } from './auth';
import { User, TUsers } from './users';
import { UserRepository } from '../data';

const auth = new Auth({ user: UserRepository });
const users = new User({ user: UserRepository });

export { auth, TAuth, users, TUsers };
