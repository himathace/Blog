const passport=require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User=require("../schema/user")


passport.use(new GoogleStrategy({
    clientID: process.env.AUTH_client_id,
    clientSecret: process.env.AUTH_client_serect,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {

    try{
        let olduser = await User.findOne({ email: profile.emails[0].value });
    
        if (olduser) {
            return done(null,olduser)

        }

        const newuser = await User.create({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
        });

        await newuser.save()
        return done(null,newuser)
    }
    catch(error){
        return done(error,null)

    }

  }
));