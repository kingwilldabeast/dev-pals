//Parent Schema

const { Schema } = require('mongoose')

const UserSchema = new Schema(
    {
        username: {type: String, required: true},
        password: {type: String, required: true},
        firstname: {type: String, required: true},
        lastname: {type: String, required: true},
        age: {type: String, required: true},
        //DOB 
        //array of skills 
        location: {type: String, required: true},
        profilePicURL: {type: String}
    },
    {timestamps: true}

)

//VERSION THAT USES models/index.JS
module.exports = UserSchema

//ALTERNATE WITHOUT models/index.JS
// const mongoose = require('mongoose')
// const Publisher = mongoose.model('Publisher', publisherSchema)
// module.exports = Publisher