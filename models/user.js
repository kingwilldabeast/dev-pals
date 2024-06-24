//Parent Schema

const { Schema } = require('mongoose')

const UserSchema = new Schema(
    {
        username: {type: String, required: true},
        password: {type: String, required: true},
        firstname: {type: String},
        lastname: {type: String},
        age: {type: String},
        //DOB 
        //array of skills 
        location: {type: String},
        profilePicURL: {type: String},
        likedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
    },
    {timestamps: true}

)

//VERSION THAT USES models/index.JS
module.exports = UserSchema

//ALTERNATE WITHOUT models/index.JS
// const mongoose = require('mongoose')
// const Publisher = mongoose.model('Publisher', publisherSchema)
// module.exports = Publisher