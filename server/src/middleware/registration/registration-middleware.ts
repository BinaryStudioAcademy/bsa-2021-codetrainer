import passport from 'passport';

export const registrationMiddleware = passport.authenticate('register', { session: false });
