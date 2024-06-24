//all in one seed file

const db = require('../db')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const { User, Post, Comment } = require('../models') //with models/index.js

// const User  = require('../models/brand') //without models/index.js
// const Post  = require('../models/Post') //without inmodels/index.jsdex
// const Comment  = require('../models/Comment') //without models/index.js


const resetCollections = async () => {
    try {
        await User.deleteMany({});
        await Post.deleteMany({});
        await Comment.deleteMany({});
        console.log('All collection reset');
    } catch (error) {
        console.error('Error resetting collections:', error);
    }
};

const main = async () => {

  await resetCollections();   

  const user1 = await new User({
    username: 'tomfrommyspace',
    email: 'tomsmith@gmail.com',
    password: '123456',
    firstname: 'Tom',
    lastname: "Smith",
    age: 29,
    location: '123 Main St, Orlando, FL',
    profilePicURL: 'tom.jpeg'
  })
  user1.save()

  const user2 = await new User({
    username: 'billyboy',
    email: 'johnsonbill@gmail.com',
    password: '123456',
    firstname: 'Bill',
    lastname: "Johnson",
    age: 31,
    location: '456 Main St, Orlando, NY',
    profilePicURL: 'bill.jpeg'
  })
  user2.save()

  const PostArray = [
    {
      user_id: user1._id,
      created_at: 'May 26, 2001',
      content: 'Today I had pizza',
      likes: 26,
    },
    {
        user_id: user2._id,
        created_at: 'Aug 26, 2018',
        content: 'Today I had tacos',
        likes: 18,
    },
  ]

  const Posts = await Post.insertMany(PostArray)
  console.log('Created Posts!')
  
  const CommentArray  = [
        {
        user_id: user1._id,
        post_id: Posts[0]._id,
        created_at: 'Jan 4, 2006',
        content: "I liked my own post. -Tom",
        likes: 4
        },
        {
        user_id: user2._id,
        post_id: Posts[0]._id,
        created_at: 'Jan 5, 2006',
        content: "I liked your post too, Tom. -Bill",
        likes: 4
        },

    ]


    await Comment.insertMany(CommentArray)
    console.log('Created Comments!')
}

const run = async () => {
  await main()
  db.close()
}

run()