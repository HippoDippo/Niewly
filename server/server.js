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
  successRedirect: process.env.REACT_APP_SUCCESS_REDIRECT,
  failureRedirect: process.env.REACT_APP_FAILURE_REDIRECT
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
  return res.redirect(process.env.REACT_APP_REDIRECT);
});

app.get('/api/getAllUsers', (req, res) => {
  const db = req.app.get('db');

  db.get_all_users()
  .then(users => {
    if (users)
      res.status(200).send(users);
    else
      res.status(404).send('not found');
  });
});

app.get('/api/getFollowedUsers/:id', (req, res) => {
  const db = req.app.get('db');

  db.get_followed_users(req.params.id)
  .then(users => {
    res.status(200).send(users);
  });
});

app.get('/api/searchusers/:username', (req, res) => {
  const db = req.app.get('db');
  let username = req.params.username + '%';

  db.search_for_users(username)
  .then(users => {
    res.status(200).send(users);
  });
});

app.get('/api/searchposts/:title', (req, res) => {
  const db = req.app.get('db');
  let title = req.params.title + '%';

  db.search_for_posts(title)
  .then(posts => {
    res.status(200).send(posts);
  });
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

app.get('/api/getOurPosts/:id', (req, res) => {
  const db = req.app.get('db');

  db.get_our_posts(req.params.id)
  .then(posts => {
    res.status(200).send(posts);
  });
});

app.get('/api/getSavedPosts/:ids', (req, res) => {
  const db = req.app.get('db');

  db.get_saved_posts(req.params.ids)
  .then(savedPosts => {
    res.status(200).send(savedPosts);
  });
});

app.get('/api/getBookmarks/:userId', (req, res) => {
  const db = req.app.get('db');

  db.get_all_bookmarks(req.params.userId)
  .then(bookmarks => {
    res.status(200).send(bookmarks);
  });
});

app.post('/api/createPost', (req, res) => {
  const db = req.app.get('db');

  db.create_post(req.body.user_id, req.body.title, req.body.intro, req.body.author, req.body.body);
});

app.post('/api/createBookmark', (req, res) => {
  const db = req.app.get('db');

  db.create_bookmark(req.body.user_id, req.body.post_id);
});

app.post('/api/followUser', (req, res) => {
  const db = req.app.get('db');

  db.follow_user(Number(req.body.userID), Number(req.body.followedUserID));
});

app.put('/api/editPost', (req, res) => {
  const db = req.app.get('db');

  db.edit_post(req.body.id, req.body.post_title, req.body.post_intro, req.body.post_body);
});

app.delete('/api/deletePost/:userID/:postID', (req, res) => {
  const db = req.app.get('db');

  db.delete_post(Number(req.params.userID), Number(req.params.postID));
});

app.delete('/api/deleteBookmark/:id/:post_id', (req, res) => {
  const db = req.app.get('db');

  db.delete_bookmark(Number(req.params.id), Number(req.params.post_id));
});

app.delete('/api/unfollowUser/:userID/:followedUserID', (req, res) => {
  const db = req.app.get('db');

  db.unfollow_user(Number(req.params.userID), Number(req.params.followedUserID));
});

massive(CONNECTION_STRING)
.then(db => {
  app.set('db', db);

  app.listen(PORT, () => {
    console.log('Listening on port ', PORT);
  });
});
