import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import passport from "passport";
import { User } from "../model";

const JWT_SECRET = process.env.JWT_SECRET as string;

// Strategy for Admins
const adminOpts: StrategyOptions = {
     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
     secretOrKey: JWT_SECRET,
};

passport.use(
     "user",
     new JwtStrategy(adminOpts, async (jwtPayload, done) => {
          try {
               const user = await User.findById(jwtPayload.id);
               if (user) {
                    return done(null, user);
               }
               return done(null, false);
          } catch (err) {
               return done(err, false);
          }
     }),
);

export default passport;
