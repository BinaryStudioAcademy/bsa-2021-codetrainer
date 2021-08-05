import { EntityRepository, Repository } from 'typeorm';
import { ProfileClan } from '../../models';

@EntityRepository(ProfileClan)
export class ProfileClanRepository extends Repository<ProfileClan> {}
