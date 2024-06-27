const express = require('express')
const cors = require('cors');
const bodyParser = require(`body-parser`)
const logger = require(`morgan`)

const app = express()
app.use(cors());
app.use(bodyParser.json())
app.use(logger(`dev`))

const db = require('./db')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

//FILEPATHS
const UserController = require('./controllers/UserController')
const PostController = require('./controllers/PostController')
const CommentController = require('./controllers/CommentController')

//LANDING PAGE
app.get('/', (req, res) => res.send('This is our landing page!'))

//READ GET 
app.get('/users', UserController.getAllUsers)
app.get('/posts', PostController.getAllPosts)
app.get('/comments', CommentController.getAllComments)

app.get('/users/:id', UserController.getUserById)
app.get('/users/friends/:id', UserController.getFriendsByUserId)
app.get('/users/usernames/:username', UserController.getUserByUsername)
app.get('/users/username/:username', UserController.getUserIdByUsername)
app.get('/posts/:id', PostController.getPostById)
app.get('/userPosts/:username', PostController.getPostsByUsername)
app.get('/comments/:id', CommentController.getCommentById)
app.get('/postComments/:postId', CommentController.getCommentsByPostId)

//CREATE POST
app.post('/users', UserController.createUser)
app.post('/posts', PostController.createPost)
app.post('/comments', CommentController.createComment)

//UPDATE PUT
app.put('/users/:id', UserController.updateUser)
app.put('/posts/:id', PostController.updatePost)
app.put('/comments/:id', CommentController.updateComment)
app.put('/users/:loggedInUser/addFriend/:userId', UserController.addFriend)
// app.put('/users/:loggedInUser/sendFriendRequest/:userId', UserController.sendFriendRequest)
app.put('/users/:userId/postLikes/:postId', UserController.toggleLikePost)
app.put('/users/:userId/commentLikes/:commentId', UserController.toggleLikeComment)

//DELETE
app.delete('/users/:id', UserController.deleteUser)
app.delete('/posts/:id', PostController.deletePost)
app.delete('/comments/:id', CommentController.deleteComment)


//DEFAULT
app.get('*', (req, res) => res.send('404 page not found'))
