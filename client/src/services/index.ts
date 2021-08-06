import { Auth } from './auth';
import { Http } from './http';

const http = new Http();
const authServices = new Auth({ http });

export { authServices, http };
