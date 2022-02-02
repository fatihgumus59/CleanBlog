const express = require('express');
const mongoose = require('mongoose');

const path = require('path');
const ejs = require('ejs');

const Post = require('./models/Post');

const app = express();

mongoose.connect('mongodb://localhost/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  const posts = Post.find({});
  res.render('index', {
    posts,
    title: 'Home',
  });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/post', (req, res) => {
  res.render('post', { title: 'Post' });
});

app.get('/add_post', (req, res) => {
  res.render('add_post', { title: 'Add Post' });
});

app.post('/post-add', async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});
