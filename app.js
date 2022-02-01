const express = require('express');
const path = require('path');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { title: 'Clean Blog' });
});

app.get('/about', (req, res) => {
  res.render('about',{title: "About"});
});

app.get('/post', (req, res) => {
  res.render('post',{title:"Post"});
});

app.get('/add_post', (req, res) => {
  res.render('add_post',{title:"Add Post"});
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});
