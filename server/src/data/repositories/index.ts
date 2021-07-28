import { getCustomRepository } from 'typeorm';
import { UserRepository } from './user';

// const userRepository = getCustomRepository(UserRepository);

type TUserRepository = typeof UserRepository;

export { UserRepository, TUserRepository };
