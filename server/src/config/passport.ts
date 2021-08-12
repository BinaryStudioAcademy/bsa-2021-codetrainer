import passport from 'passport';
import { getCustomRepository } from 'typeorm';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GithubStrategy } from 'passport-github2';
import { ENV } from '../common';
import { UserRepository } from '../data';
import { cryptCompare } from '../helpers';
import { GithubApiPath } from '../common/enum/api/github-api-path';
import { ValidationError } from '../helpers/errors/validation-error';
import { HttpCodes } from '../common/enum/http-codes';

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: ENV.JWT.SECRET,
};

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
		async ({ body: { username, name, surname } }, email, password, done) => {
			const repository = getCustomRepository(UserRepository);
			try {
				const userByEmail = await repository.getByEmail(email);
				if (userByEmail) {
					return done({ status: 401, message: 'Email is already taken.' }, null);
				}

				const userByUsername = await repository.getByUsername(username);
				if (userByUsername) {
					return done({ status: 401, message: 'Username is already taken.' }, null);
				}
				return done(null, { username, email, name, surname, password });
			} catch (err) {
				return done(err);
			}
		},
	),
);

passport.use(
	new JwtStrategy(options, async ({ id }, done) => {
		const repository = getCustomRepository(UserRepository);
		try {
			const user = await repository.getById(id);
			return user ? done(null, user) : done({ status: 401, message: 'Token is invalid.' }, null);
		} catch (err) {
			return done(err);
		}
	}),
);

passport.use(
	'github-login',
	new GithubStrategy(
		{
			clientID: ENV.GITHUB.CLIEND_ID,
			clientSecret: ENV.GITHUB.SECRET,
			callbackURL: ENV.GITHUB.CALLBACK + GithubApiPath.LOGIN,
		},
		async (_access: string, _refresh: string, profile: any, done: any) => {
			const repository: UserRepository = getCustomRepository(UserRepository);
			const { id }: { id: string } = profile;
			const user = await repository.getByGithubId(id);
			if (user) {
				done(null, await user);
			} else {
				done(
					new ValidationError({
						status: HttpCodes.UNAUTHORIZED,
						message: 'No user with this github account',
					}),
				);
			}
		},
	),
);

passport.use(
	'github-register',
	new GithubStrategy(
		{
			clientID: ENV.GITHUB.CLIEND_ID,
			clientSecret: ENV.GITHUB.SECRET,
			scope: ['user:email'],
			callbackURL: ENV.GITHUB.CALLBACK + GithubApiPath.REGISTER,
		},
		async (_access: string, _refresh: string, profile: any, done: any) => {
			const repository: UserRepository = getCustomRepository(UserRepository);
			const { id }: { id: string } = profile;
			const user = await repository.getByGithubId(id);
			if (!user) {
				done(null, profile);
			} else {
				done(
					new ValidationError({
						status: HttpCodes.UNAUTHORIZED,
						message: 'Already exists',
					}),
				);
			}
		},
	),
);

passport.use(
	'github-link',
	new GithubStrategy(
		{
			clientID: ENV.GITHUB.CLIEND_ID,
			clientSecret: ENV.GITHUB.SECRET,
			callbackURL: ENV.GITHUB.CALLBACK + GithubApiPath.LINK,
		},
		async (_access: string, _refresh: string, profile: any, done: any) => {
			const repository: UserRepository = getCustomRepository(UserRepository);
			const { id: githubId }: { id: string } = profile;
			const user = await repository.getByGithubId(githubId);
			if (!user) {
				done(null, { githubId });
			} else {
				done(
					new ValidationError({
						status: HttpCodes.BAD_REQUEST,
						message: 'User with this github account already exists',
					}),
				);
			}
		},
	),
);
