const express = require('express');
require('./db/config');
const cors = require('cors');
const User = require('./db/user');
const Blog = require('./db/blog');
const Jwt = require('jsonwebtoken');
const jwtKey = "e-blog";
const PORT = process.env.PORT || 3000
const app = express();
app.use(express.json());
app.use(cors());
app.post('/register', async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({ result }, jwtKey, (err, token) => {
        if (err) {
            res.send({ result: "Something went wrong, please try again later" })
        }
        res.send({ result, auth: token })
    })
    // res.send(result);
    // console.log(result);
})

app.post('/login', async (req, res) => {
    console.log(req.body);
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({ user }, jwtKey, (err, token) => {
                if (err) {
                    res.send({ result: "Something went wrong, Please try again later" })
                }
                res.send({ user, auth: token })
            })
        } else {
            res.send({ result: "User not found" })
        }
    } else {
        res.send({ result: "User not found" })
    }
})

app.post('/add', async (req, res) => {
    let blog = new Blog(req.body);
    let result = await blog.save();
    res.send(result);
    console.log(result);
})


app.get('/blogs', async (req, res) => {
    let blogs = await Blog.find();
    res.send(blogs)
})

app.delete('/blogs/:id', async (req, res) => {
    const result = await Blog.deleteOne({ _id: req.params.id });
    res.send(result);

})











app.get('/search/:key', async (req, res) => {
    let result = await Blog.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { blog: { $regex: req.params.key } }

        ]
    })
    res.send(result);
})
app.get('/profile/:id', async (req, res) => {
    let result = await User.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    } else {
        res.send({ result: "No record found" })
    }

})
app.listen(PORT)


