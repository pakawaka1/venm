const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// get posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

// add post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

// delete post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
    res.status(200).send();

})


///connects to db
const loadPostsCollection = async () => {
    const client = await mongodb.MongoClient.connect('mongodb+srv://pakawaka1:Sonicyouth1!@cluster0.2drjp0l.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true 
    });

    return client.db('venm').collection('posts');
}

module.exports = router;