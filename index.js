const express = require("express")
const userController = require('./controllers/user.controllers')

const {register, login} = require('./controllers/auth.controllers')

const app = express()

app.use(express.json())

app.use("/users", userController)

app.use("/books", bookController)

app.use("/publications", publicationController)

app.use("/comments", commentController)

app.post("/register", register)

app.post("/login", login)

const bookController = require('./controllers/book.controllers')

const publicationController = require('./controllers/publication.controllers')

const commentController = require('./controllers/comment.controllers')

module.exports = app;