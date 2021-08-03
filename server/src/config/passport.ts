import passport from 'passport';
import { getCustomRepository } from 'typeorm';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserRepository } from '../data';
import { cryptCompare } from '../helpers';

passport.use(
	'login',
	new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
		const repository = getCustomRepository(UserRepository);
		try {
			const user = await repository.getByEmail(email);
			if (!user) {
				return done({ status: 401, message: 'Incorrect email.' }, null);
			}
			return (await cryptCompare(password, user.password))
				? done(null, user)
				: done({ status: 401, message: 'Password does not match.' }, null);
		} catch (err) {
			return done(err);
		}
	}),
);

passport.use(
	'register',
	new LocalStrategy(
		{ passReqToCallback: true, usernameField: 'email' },
		async ({ body: { name, surname } }, email, password, done) => {
			const repository = getCustomRepository(UserRepository);
			try {
				const userByEmail = await repository.getByEmail(email);
				if (userByEmail) {
					return done({ status: 401, message: 'Email is already taken.' }, null);
				}
				return done(null, { email, name, surname, password });
			} catch (err) {
				return done(err);
			}
		},
	),
);
