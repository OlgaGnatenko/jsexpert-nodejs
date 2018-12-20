const posts = require('../mock/posts');
const Post = require('../models/post.model');
// todo: add escaping and/or sanitization for post text 

const maxRndPictureID = 10000;

const getPosts = (req, res) => {
    Post.find({}, null, { sort: {publicationDate: -1}}, (err, posts) => {
        err ? res.status(500).json(err) : res.status(200).send(posts)
    })
};

const uploadPicture = async (file) => {
    // todo: verify extensions to avoid saving malicious files
    const { name } = file;
    const rnd = Math.round(Math.random() * maxRndPictureID);
    const picturePath = `./public/uploaded-pictures/${rnd}-${name}`;
    const publicPicturePath = `/uploaded-pictures/${rnd}-${name}`;
    try {
        await file.mv(picturePath);
        return { picturePath: publicPicturePath };
    } catch (err) {
        return { err };
    }
};

const postPost = async (req, res) => {
    const { text } = req.body;
    const postPicture = req.files && req.files.picture;
    let picture = "";
    try {
        if (postPicture) {
            let result = await uploadPicture(postPicture);
            if (result.err) {
                throw new Error("Error saving file to server")
            }
            picture = result.picturePath;
        } else {
            picture = req.body.picture;
        }
        const post = new Post({ text, picture });
        let publishedPost = await post.save();
        return res.status(201).send(publishedPost);
    } catch (err) {
        return res.status(500).json(err);
    }
}


const getPost = (req, res) => {
    const { id } = req.params;
    const post = Post.findOne({_id: id}, (err, post) => {
        if (err) {
            return res.status(500).json(err)
        }
        if (!post) {
            return res.status(404).json(new Error("Post with such id does not exist"))
        }
        res.status(200).send(post);
    });
}

const updatePost = (req, res) => {
    const { text, picture, id } = req.body;
    const update = { text, picture };
    const options = {new: true, runValidators: true};

    // todo: handle validation errors on FE - show splash screen or return to editing 
    Post.findOneAndUpdate({_id: id}, update, options, (err, post) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (!post) {
            return res.status(404).json(new Error("Post with such id does not exist"));
        }
        res.status(200).send(post);
    });
}

const removePost = (req, res) => {
    Post.findByIdAndRemove({_id: req.params.id}, function(err, post) {
        err ? res.status(500).json(err) : res.status(200).send(post)
    });
}

module.exports = {
    getPosts,
    postPost,
    getPost,
    updatePost,
    removePost
};

