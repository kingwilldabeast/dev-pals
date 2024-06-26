const {Comment} = require('../models'); //with models/index.js file

//Read
const getAllComments = async (req, res) => {
    try {
        const objectArray = await Comment.find()
        res.json(objectArray)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

//Read
const getCommentById = async (req, res) => {
    try {
        const { id } = req.params
        const singleObject = await Comment.findById(id)
        if (singleObject) {
            return res.json(singleObject)
        }
        return res.status(404).send(`that Comment doesn't exist`)
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`That Comment doesn't exist`)
        }
        return res.status(500).send(error.message);
    }
}

const getCommentsByPostId = async (req, res) => {
    try {
        const { postId } = req.params
        // I was getting confused about the multiple api calls I was having to make in order to obtain information from both the CommentSchema and UserSchema. ChatGPT recommended this populate method, which replaces the user_id with only the fields that we want from the user_id for our comment divs. This makes for 1 less api call, increased performance and less headaches. Definitely a good method to remember.
        const comments = await Comment.find({ post_id: postId }).populate('user_id', 'username')
        return res.status(200).json(comments)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

//create
const createComment = async (req, res) => {
    try {
        const newComment = new Comment(req.body)
        await newComment.save()
        const populatedComment = await Comment.findById(newComment._id).populate('user_id', 'username')
        res.status(201).json(populatedComment)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

//update
const updateComment = async (req, res) => {
    try {
        let { id } = req.params;
        let changedObject = await Comment.findByIdAndUpdate(id, req.body, { new: true })
        if (changedObject) {
            return res.status(200).json(changedObject)
        }
        throw new Error("Comment not found and can't be updated")
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`That Comment doesn't exist`)
        }
        return res.status(500).send(error.message);
    }
}

//delete
const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const erasedObject = await Comment.findByIdAndDelete(id)
        if (erasedObject) {
            return res.status(200).send("Comment deleted");
        }
        throw new Error("Comment not found and can't be deleted");
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`That Comment doesn't exist`)
        }
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getAllComments, 
    getCommentById, 
    getCommentsByPostId,
    createComment, 
    updateComment, 
    deleteComment,
}