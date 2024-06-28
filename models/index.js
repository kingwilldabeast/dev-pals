//summarizes and exports all other models
const mongoose = require('mongoose')
const UserSchema = require('./user')
const PostSchema = require('./post')
const CommentSchema = require('./comment')

//convert schema to model with the same name
const User = mongoose.model('User', UserSchema)
const Post = mongoose.model('Post', PostSchema)
const Comment = mongoose.model('Comment', CommentSchema)

module.exports = {
    User,
    Post,
    Comment
  }
  