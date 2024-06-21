//summarizes and exports all other models
const mongoose = require('mongoose')
const UserSchema = require('./user')
const PostSchema = require('./post')
const CommentSchema = require('./comment')

//NOTE: unlike controller files, cannot put these in same line with brackets, as far as I know
//const {PublisherSchema, BookSchema} = require('./')

//convert schema to model with the same name
const User = mongoose.model('User', UserSchema)
const Post = mongoose.model('Post', PostSchema)
const Comment = mongoose.model('Comment', CommentSchema)

module.exports = {
    User,
    Post,
    Comment
  }
  