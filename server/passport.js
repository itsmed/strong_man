'use strict';

const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


const configAuth = require('./config');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    console.log(`user ${id} deserialized`);
    done(id);
  });

  passport.use(new GoogleStrategy({
    clientID: config.goog.id,
    clientSecret: config.goog.secret,
    callbackURL: config.goog.callback
  },
  function handleToken(accessToken, refreshToken, profile, done) {
    console.log(profile);
    return done(null, profile);
  }));


};