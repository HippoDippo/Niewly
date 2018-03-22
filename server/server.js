require('dotenv').config();
const express = require('express')
    , session = require('express-session')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive');

const app = express();
const PORT = process.env.SERVER_PORT || 3003;
const CONNECTION_STRING = process.env.CONNECTION_STRING;

app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../build'));

passport.use(new Auth0Strategy({
  domain: process.env.AUTH_DOMAIN,
  clientID: process.env.AUTH_CLIENT_ID,
  clientSecret: process.env.AUTH_CLIENT_SECRET,
  callbackURL: process.env.AUTH_CALLBACK,
  scope: 'openid profile'
}, function(accessToken, refreshToken, extraParams, profile, done) {
  const db = app.get('db');

  db.find_user([ profile.user_id ])
  .then(user => {
    if (user[0]) {
      return done(null, { id: user[0].id });
    } else {
      db.create_user([ profile.displayName, profile.picture, profile.user_id ])
      .then(user => {
        return done(null, { id: user[0].id });
      });
    }
  })
}));

app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0', {
  successRedirect: 'http://localhost:3000/#/profile',
  failureRedirect: 'http://localhost:3003/auth'
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  app.get('db').find_session_user([user.id])
  .then(user => {
    return done(null, user[0]);
  });
});

app.get('/auth/me', (req, res, next) => {
  if (!req.user) {
    return res.status(401).send('Log In required');
  } else {
    return res.status(200).send(req.user);
  }
});

app.get('/auth/logout', (req, res) => {
  req.logOut();
  return res.redirect('http://localhost:3000/#/feed');
});

app.get('/api/getPost/:id', (req, res) => {
  const db = req.app.get('db');

  db.get_post(req.params.id)
  .then(post => {
    res.status(200).send(post);
  });
});

app.get('/api/getPosts', (req, res) => {
  const db = req.app.get('db');

  db.get_all_posts()
  .then(posts => {
    res.status(200).send(posts);
  });
})

app.post('/api/createPost', (req, res) => {
  const db = req.app.get('db');

  db.create_post(req.body.user_id, req.body.title, req.body.intro, req.body.author, req.body.body);
});
// app.put();
// app.delete();

massive(CONNECTION_STRING)
.then(db => {
  app.set('db', db);

  app.listen(PORT, () => {
    console.log('Listening on port ', PORT);
  });
});
