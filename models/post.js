//CHILD schema that references parent by ID

const { Schema } = require('mongoose')

const PostSchema = new Schema(
    {
        user_id: { type: Schema.Types.ObjectId, ref: 'user_id' },
        content: { type: String, required: true },
        date: { type: Date, required: true },
        likes: { type: Number, required: true },
        //array of users who liked it
    },
    {timestamps: true}

)

//VERSION THAT USES models/index.JS
module.exports = PostSchema

//ALTERNATE WITHOUT models/index.JS
// const mongoose = require('mongoose')
// const Book = mongoose.model('Book', bookSchema)
// module.exports = Book