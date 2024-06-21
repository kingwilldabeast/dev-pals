
    
//ASYNC versions, if using mongoose
const {Comment} = require('../models'); //with models/index.js file
//const Comment = require('../models/Comment'); //without models/index.js file

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

//create
const createComment = async (req, res) => {
    try {
        const newObject = await new Comment(req.body)
        await newObject.save()
        return res.status(201).json({
            newObject,
        });
    } catch (error) {
        // if (error.name === 'CastError' && error.kind === 'ObjectId') {
        //     return res.status(404).send(`That Comment doesn't exist`)
        // }
        return res.status(500).json({ error: error.message })
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
    createComment, 
    updateComment, 
    deleteComment,
}