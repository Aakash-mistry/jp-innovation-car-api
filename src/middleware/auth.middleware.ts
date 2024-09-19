import passport from "passport";

export const authAdminMiddleware = passport.authenticate("admin", { session: false });
