//CHILD schema that references parent by ID

const { Schema } = require('mongoose')

const PostSchema = new Schema(
    {
        user_id: { type: Schema.Types.ObjectId, ref: 'User' },
        created_at: { type: Date, required: true, default: Date.now },
        content: { type: String, required: true },
        likes: { type: Number, required: true },
        //array of users who liked it
    },
    {timestamps: true}

)

//VERSION THAT USES models/index.JS
module.exports = PostSchema
