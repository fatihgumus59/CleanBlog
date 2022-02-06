const Post = require('../models/Post');

exports.getAbout = (req, res) => {
  res.render('about', { title: 'About' });
};

exports.getAddPost = (req, res) => {
  res.render('add_post', { title: 'Add Post' });
};

exports.getEditPage = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  res.render('edit-post', {
    post,
    title: `${post.title} | Edit Page`,
  });
};
