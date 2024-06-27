
    
//ASYNC versions, if using mongoose
const {Post, User} = require('../models'); //with models/index.js file
//const Post = require('../models/Post'); //without models/index.js file

//Read
const getAllPosts = async (req, res) => {
    try {
        const objectArray = await Post.find()
        res.json(objectArray)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

//Read
const getPostById = async (req, res) => {
    try {
        const { id } = req.params
        const singleObject = await Post.findById(id)
        if (singleObject) {
            return res.json(singleObject)
        }
        return res.status(404).send(`that Post doesn't exist`)
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`That Post doesn't exist`)
        }
        return res.status(500).send(error.message);
    }
}

const getPostsByUsername = async (req, res) => {
    try {
        const { username } = req.params
        const user = await User.findOne({ username: username })

        if (!user) {
            return res.status(404).send("User not found");
        }

        const userPosts = await Post.find({ user_id: user._id }).sort({ created_at: -1 })
        return res.status(200).json(userPosts)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

//create
const createPost = async (req, res) => {
    try {
        const newObject = await new Post(req.body)
        await newObject.save()
        return res.status(201).json({
            newObject,
        });
    } catch (error) {
        // if (error.name === 'CastError' && error.kind === 'ObjectId') {
        //     return res.status(404).send(`That Post doesn't exist`)
        // }
        return res.status(500).json({ error: error.message })
    }
}

//update
const updatePost = async (req, res) => {
    try {
        let { id } = req.params;
        let changedObject = await Post.findByIdAndUpdate(id, req.body, { new: true })
        if (changedObject) {
            return res.status(200).json(changedObject)
        }
        throw new Error("Post not found and can't be updated")
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`That Post doesn't exist`)
        }
        return res.status(500).send(error.message);
    }
}

//delete
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const erasedObject = await Post.findByIdAndDelete(id)
        if (erasedObject) {
            return res.status(200).send("Post deleted");
        }
        throw new Error("Post not found and can't be deleted");
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`That Post doesn't exist`)
        }
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getAllPosts, 
    getPostById,
    getPostsByUsername,
    createPost, 
    updatePost, 
    deletePost,
}