//CHILD schema that references parent by ID

const { Schema } = require('mongoose')

const CommentSchema = new Schema(
    {
        user_id: { type: Schema.Types.ObjectId, ref: 'user_id' },
        post_id: { type: Schema.Types.ObjectId, ref: 'post_id' },
        created_at: { type: Date, required: true, default: Date.now },
        content: { type: String, required: true },
        likes: { type: Number, required: true },
        //array of users who liked it
    },
    {timestamps: true}

)

//VERSION THAT USES models/index.JS
module.exports = CommentSchema

//ALTERNATE WITHOUT models/index.JS
// const mongoose = require('mongoose')
// const Book = mongoose.model('Book', bookSchema)
// module.exports = Book