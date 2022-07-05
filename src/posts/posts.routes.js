const express = require('express');
const model = require('./posts.model')
const {getCategories,newCategory} = require('../categories/categories.model')

const router = express.Router();


const {isAuth} = require('../auth/auth.middleware');

router.get('/:id', async (req,res) => {
    const id = req.params.id;
    const post = await model.getPostById(id);
    if(!post)
    {
        res.status(404).send({
            message:"Cannot find this post"
        })
    }
    res.status(200).send(post);
})

router.get('/', async (req,res) => {
    const posts = await model.getAll();
    if(!posts){
        res.status(200).send([]);
    }
    res.status(200).send(posts);
})

router.get('/myPosts',isAuth,async (req,res) => {
    const myPosts = await model.getMy(req.user.username);
    if(!myPosts)
    {
        res.status(200).send([]);
    }
    res.status(200).send(myPosts);
})

router.post('/', isAuth, async (req,res) => {

    try {
        const availableCategories = await getCategories();
        req.body.categories.forEach(async category => {
            if(!availableCategories.includes(category)){
                const newCat = await newCategory(category);
                console.log(newCat);
            }
            
        });
        await model.createPost(req.body.post,req.user.username,req.body.categories);
        res.status(201).send({
            message:"Successfully Posted"
        })
    }
    catch(err) {
        console.log(err);
        res.status(400).send({
            message:"Error, cannot post",
        })
    }
})

router.put('/:id',isAuth,async (req,res) => {
    const post = await model.getPostById(req.params.id);
    if(!post) {
        res.status(404).send({
            message:"Cannot find this post"
        })
    }
    if(post.username === req.user.username)
    {
        model.updatePost(req.params.id,req.body);
    }
    else 
    {
        res.status(403).send({
            message:"You don't own this post"
        });
    }
    
})

router.delete('/:id',isAuth,async (req,res) => {
    const post = await model.getPostById(req.params.id);
    if(!post){
        res.status(404).send({
            message:"Post unavailable"
        })
    }
    if(req.user.username != post.username) {
        res.status(403).send(
            {
                message:"You don't own this post"
            }
        )
    }
    try {
        await model.deletePost(req.params.id);
        res.status(200).send({
            message:"Post deleted"
        })
    }
    catch {
        res.status(400).send({
            message:"An error ocurred"
        })
    }
})

router.get('/:category',async (req,res) => {
    const category = req.params.category;
    const post = await model.getByCategory(category)
    if(!post)
    {
        res.status(404).send({
            message:"Cannot find this post"
        })
    }
    res.status(200).send(post);
})


module.exports = router;