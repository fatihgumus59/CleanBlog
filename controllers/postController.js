const Post = require('../models/Post');

exports.getAllPost = async (req, res) => {
  const posts = await Post.find({}).sort('-dataCreate');
  res.render('index', {
    posts,
    title: 'Home',
  });
};

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', {
    post,
    title: post.title,
  });
};

exports.createPost = async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
};

exports.updatePost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });

  post.title = req.body.title;
  post.detail = req.body.detail;
  post.author = req.body.author;

  post.save();
  res.redirect(`/posts/${req.params.id}`);
};

exports.deletePost = async (req, res) => {
  await Post.findByIdAndRemove(req.params.id);
  res.redirect('/');
};
