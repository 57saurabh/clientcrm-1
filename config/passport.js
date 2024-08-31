const LocalStrategy = require('passport-local').Strategy;
const Client = require('../models/Clients');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const client = await Client.findOne({ username });
        if (!client) return done(null, false, { message: 'Incorrect username.' });

        const isMatch = await client.comparePassword(password);
        if (!isMatch) return done(null, false, { message: 'Incorrect password.' });

        return done(null, client);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((client, done) => done(null, client.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const client = await Client.findById(id);
      done(null, client);
    } catch (err) {
      done(err);
    }
  });
};
