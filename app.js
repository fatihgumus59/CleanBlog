const express = require('express');
const mongoose = require('mongoose');
var methodOverride = require('method-override');

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
app.use(methodOverride('_method', { methods: ['GET', 'POST'] }));

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
  const posts = await Post.find({});
  res.render('index', {
    posts,
    title: 'Home',
  });
});

app.get('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', {
    post,
    title: post.title,
  });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/add_post', (req, res) => {
  res.render('add_post', { title: 'Add Post' });
});

app.post('/posts', async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
});

app.get('/posts/edit/:id', async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  res.render('edit-post', {
    post,
    title: `${post.title} | Edit Page`,
  });
});

app.put('/posts/:id', async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });

  post.title = req.body.title;
  post.detail = req.body.detail;
  post.author = req.body.author;

  post.save();
  res.redirect(`/posts/${req.params.id}`);
});

app.delete('/posts/:id', async (req, res) => {
  await Post.findByIdAndRemove(req.params.id);
  res.redirect('/');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});
