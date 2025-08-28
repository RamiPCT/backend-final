import passport from "passport";
import local from "passport-local";
import jwt from "passport-jwt";
import bcrypt from "bcrypt";
import UserModel from "../models/User.js";

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) token = req.cookies["jwtCookie"];
    return token;
};

export const initializePassport = () => {
    passport.use("register", new LocalStrategy(
        { passReqToCallback: true, usernameField: "email" },
        async (req, email, password, done) => {
            try {
                const { first_name, last_name, age } = req.body;
                const user = await UserModel.findOne({ email });
                if (user) return done(null, false, { message: "User already exists" });

                const newUser = await UserModel.create({
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password),
                    role: "user"
                });
                return done(null, newUser);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use("login", new LocalStrategy(
        { usernameField: "email" },
        async (email, password, done) => {
            try {
                const user = await UserModel.findOne({ email });
                if (!user) return done(null, false, { message: "User not found" });
                if (!isValidPassword(user, password)) return done(null, false, { message: "Invalid password" });
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use("jwt", new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
            secretOrKey: process.env.JWT_SECRET || 'secretkey'
        },
        async (jwt_payload, done) => {
            try {
                return done(null, jwt_payload);
            } catch (error) {
                return done(error);
            }
        }
    ));
};