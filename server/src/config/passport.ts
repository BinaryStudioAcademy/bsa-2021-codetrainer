import passport from 'passport';
import { getCustomRepository } from 'typeorm';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as CustomStrategy } from 'passport-custom';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GithubStrategy } from 'passport-github2';
import { ENV } from '../common';
import { UserRepository } from '../data';
import { cryptCompare } from '../helpers';
import { GithubApiPath } from '../common/enum/api/github-api-path';
import { ValidationError } from '../helpers/errors/validation-error';
import { HttpCodes } from '../common/enum/http-codes';
import { githubService } from '../services';

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
				if (await repository.exists({ email })) {
					return done({ status: 401, message: 'Email is already taken.' }, null);
				}
				if (await repository.exists({ username })) {
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
				done(null, user);
			} else {
				done(
					new ValidationError({
						status: HttpCodes.UNAUTHORIZED,
						message: 'No account linked to github',
					}),
				);
			}
		},
	),
);

passport.use(
	'github-continue-register',
	new GithubStrategy(
		{
			clientID: ENV.GITHUB.CLIEND_ID,
			clientSecret: ENV.GITHUB.SECRET,
			scope: ['user:email'],
			callbackURL: ENV.GITHUB.CALLBACK + GithubApiPath.REGISTER,
		},
		async (_access: string, _refresh: string, profile: any, done: any) => {
			const repository: UserRepository = getCustomRepository(UserRepository);
			const { id: githubId }: { id: string } = profile;
			if (!(await repository.exists({ githubId }))) {
				done(null, profile);
			} else {
				done(
					new ValidationError({
						status: HttpCodes.UNAUTHORIZED,
						message: 'Github account already taken',
					}),
				);
			}
		},
	),
);

passport.use(
	'github-finish-register',
	new CustomStrategy(async (req, done) => {
		const repository: UserRepository = getCustomRepository(UserRepository);
		const { githubId, email, username } = req.body;
		if (await repository.exists({ email })) {
			return done(
				new ValidationError({
					status: HttpCodes.UNAUTHORIZED,
					message: 'Email is already taken',
				}),
			);
		}
		if (await repository.exists({ username })) {
			return done(
				new ValidationError({
					status: HttpCodes.UNAUTHORIZED,
					message: 'Username is alredy taken',
				}),
			);
		}
		if (!(await githubService.githubAccountExists(githubId))) {
			return done(
				new ValidationError({
					status: HttpCodes.UNAUTHORIZED,
					message: 'It is no github account',
				}),
			);
		}
		if (await repository.exists({ githubId })) {
			return done(
				new ValidationError({
					status: HttpCodes.UNAUTHORIZED,
					message: 'Github account already taken',
				}),
			);
		}
		return done(null, { githubId, email, username });
	}),
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
			if (!(await repository.exists({ githubId }))) {
				done(null, { githubId });
			} else {
				done(
					new ValidationError({
						status: HttpCodes.BAD_REQUEST,
						message: 'Github account already taken',
					}),
				);
			}
		},
	),
);
