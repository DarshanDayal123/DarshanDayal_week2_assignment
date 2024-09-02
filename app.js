const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    const posts = JSON.parse(fs.readFileSync('data/posts.json'));
    res.render('index', { posts });
});

app.get('/create', (req, res) => {
    res.render('create');
});

app.post('/create', (req, res) => {
    const posts = JSON.parse(fs.readFileSync('data/posts.json'));
    const newPost = {
        id: Date.now(),
        title: req.body.title,
        content: req.body.content,
    };
    posts.push(newPost);
    fs.writeFileSync('data/posts.json', JSON.stringify(posts, null, 2));
    res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
    const posts = JSON.parse(fs.readFileSync('data/posts.json'));
    const post = posts.find(p => p.id === parseInt(req.params.id));
    res.render('edit', { post });
});

app.post('/edit/:id', (req, res) => {
    let posts = JSON.parse(fs.readFileSync('data/posts.json'));
    posts = posts.map(post => {
        if (post.id === parseInt(req.params.id)) {
            post.title = req.body.title;
            post.content = req.body.content;
        }
        return post;
    });
    fs.writeFileSync('data/posts.json', JSON.stringify(posts, null, 2));
    res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    let posts = JSON.parse(fs.readFileSync('data/posts.json'));
    posts = posts.filter(post => post.id !== parseInt(req.params.id));
    fs.writeFileSync('data/posts.json', JSON.stringify(posts, null, 2));
    res.redirect('/');
});
