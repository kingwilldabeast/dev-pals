
    
//ASYNC versions, if using mongoose
const {User, Post} = require('../models'); //with models/index.js file
//const User = require('../models/User'); //without models/index.js file

//Read
const getAllUsers = async (req, res) => {
    try {
        const objectArray = await User.find()
        res.json(objectArray)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

//Read
const getUserById = async (req, res) => {
    try {
        const { id } = req.params
        const singleObject = await User.findById(id)
        if (singleObject) {
            return res.json(singleObject)
        }
        return res.status(404).send(`that User doesn't exist`)
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`That User doesn't exist`)
        }
        return res.status(500).send(error.message);
    }
}

const getUserByUsername = async (req, res) => {
    const { username } = req.params
    const regex = new RegExp(username, 'i');
    try {
        const singleObject = await User.findOne({username: { $regex: regex }})
        if (singleObject) {
            return res.json(singleObject)
        }
        return res.status(404).send(`that User doesn't exist`)
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`That User doesn't exist`)
        }
        return res.status(500).send(error.message);
    }
}

const getUserIdByUsername = async (req, res) => {
    const { username } = req.params
    try {
        const user = await User.findOne({ username: username })
        if (user) {
            return res.json({ _id: user._id })
        }
        return res.status(404).send('User not found')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

//create
const createUser = async (req, res) => {
    try {
        const newObject = await new User(req.body)
        await newObject.save()
        return res.status(201).json({
            newObject,
        });
    } catch (error) {
        // if (error.name === 'CastError' && error.kind === 'ObjectId') {
        //     return res.status(404).send(`That User doesn't exist`)
        // }
        return res.status(500).json({ error: error.message })
    }
}

//update
const updateUser = async (req, res) => {
    try {
        let { id } = req.params;
        let changedObject = await User.findByIdAndUpdate(id, req.body, { new: true })
        if (changedObject) {
            return res.status(200).json(changedObject)
        }
        throw new Error("User not found and can't be updated")
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`That User doesn't exist`)
        }
        return res.status(500).send(error.message);
    }
}

//delete
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const erasedObject = await User.findByIdAndDelete(id)
        if (erasedObject) {
            return res.status(200).send("User deleted");
        }
        throw new Error("User not found and can't be deleted");
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`That User doesn't exist`)
        }
        return res.status(500).send(error.message);
    }
}

const toggleLikePost = async (req, res) => {
    try {
        const { userId, postId } = req.params

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ error: 'Post not found' })
        }

        // Was trying to do this a much more complicated way with .find, and asked ChatGpt how it would handle this request. It gave me this includes method which is so nice and simple. includes is a JavaScript array method that checks if a certain value exists in an array. It returns true if the value exists in the array and false otherwise
        const hasLiked = user.likedPosts.includes(postId)

        if (hasLiked) {
            user.likedPosts.pull(postId)
            post.likes -= 1
        } else {
            user.likedPosts.push(postId)
            post.likes += 1
        }

        await user.save()
        await post.save()

        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getAllUsers, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser,
    toggleLikePost,
    getUserByUsername,
    getUserIdByUsername
}