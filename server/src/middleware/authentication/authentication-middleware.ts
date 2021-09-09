import passport from 'passport';

export const authenticationMiddleware = passport.authenticate('login', { session: false });
