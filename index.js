import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;

const posts = [];


//Post constructor
function Post(title, content) {
    this.title = title;;
    this.content = content;
    this.rawDate = new Date();
    this.date = this.rawDate.toLocaleString(); //----????
}

//Add post
function addPost(title, content) {
    let post = new Post(title, content);
    posts.push(post);
}

//Delete post
function deletePost(index) {
    posts.splice(index, 1);
}

//Edit post

function editPost(index, title, content) {
    posts[index] = new Post(title, content);
}

//Midleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));


//All paths

//Home
app.get('/', (req,res) => {
    res.render("home.ejs", { posts: posts });
});

//View post
app.get("/view/:id", (req, res) => {
    let index = req.params.id;
    let post = posts[index];
    res.render('view.ejs', {postId: index, title: post.title, content: post.content});

});

//Delete Post
app.post('/delete', (req, res) => {
    let index = req.body["postId"];
    deletePost(index);
    res.redirect("/");
});

//Edit post Page
app.get("/edit/:id", (req, res) => {
    let index = req.params.id;
    let post = posts[index];
    res.render("create.ejs", {postId: index, title: post.title, content: post.content});
});

//Update

app.post("/update", (req, res) => {
    let title = req.body["title"];
    let content = req.body["content"];
    let index = req.body["index"];
    editPost(index, title, content);
    res.redirect('/');
});

//Create Post Page
app.get("/create", (req, res) => {
    res.render("create.ejs");
});

// Save Post
app.post('/save', (req, res) => {
    let title = req.body["title"];
    let content = req.body["content"];

    addPost(title, content);
    res.redirect('/');
})



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})