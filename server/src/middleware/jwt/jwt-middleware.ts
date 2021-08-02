import passport from 'passport';

export const jwtMiddleware = passport.authenticate('jwt', { session: false });
