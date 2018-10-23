const express = require("express");
const path = require("path");
const ejs = require("ejs");
const bodyParser = require("body-parser");


const app = express();
const PORT = 3000;

const POST_RESPONSE_OK = 201;
const POST_RESPONSE_INVALID = 400;

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());
app.set("views", path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // to render html files 
app.engine('html', ejs.renderFile);

// views
app.get("/", (req, res) => {
    res.render("index.html")
});

app.get("/index.html", (req, res) => {
    res.render("index.html")
});

app.get("/about.html", (req, res) => {
    res.render("about.html")
});

app.get("/post.html", (req, res) => {
    res.render("post.html")
});

app.get("/contact.html", (req, res) => {
    res.render("contact.html")
});

// data operations
app.get('/post-data', (req, res) => {
    console.log("calling post data");
    res.json(require('./data/post'));
});

app.post('/contact', (req, res) => {
    const user = req.body;
    const userValid = (user.name && user.email && user.phone && user.message);
    res.status(userValid ? POST_RESPONSE_OK : POST_RESPONSE_INVALID);
    res.send(userValid ? user : "Incorrect data format");
});

// run server

app.listen(PORT, () => {
    console.log(`Node server is running at ${PORT}`);
})