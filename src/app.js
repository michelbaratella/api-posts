const express = require('express')

const app = express()

require('dotenv').config()

const cors = require('cors')

const PORT = process.env.PORT

const Post = require('./models/Post')

app.use(express.json())

app.use(cors())

app.get('/hello_world', (req, res) => {
    res.send('Response received')
})

app.post('/create', (req, res) => {
    const teste = req.body.title
    res.send(`Título: ${teste}`)
})

app.post('/create_post', async (req, res) => {

    try {
        const { title, content } = req.body

        const post = await Post.create({ title, content })

        res.send(post)
    } catch (err) {
        res.status(400).send(err)
    }

})

app.get('/list_posts', async (req, res) => {
    try {
        const posts = await Post.find()
        res.send({ posts })
    }
    catch (err) {
        res.status(400).send(err)
    }
})

app.get('/show_post/:post_id', async (req, res) => {
    try {
        const post_id = req.params.post_id
        const post = await Post.findById(post_id)
        res.send({ post })
    }
    catch (err) {
        res.status(400).send(err)
    }
})

app.patch('/update_post/:_id', async (req, res) => {
    try {
        const _id = req.params._id
        const { title, content } = req.body
        const post = await Post.findByIdAndUpdate(_id, { title, content }, { new: true })
        res.send({ post })
    }
    catch (err) {
        res.status(400).send(err)
    }
})

app.delete('/remove/:_id', async (req, res) => {
    try {
        const _id = req.params._id
        const post = await Post.findByIdAndRemove(_id, { new: true })
        res.send({ msg: 'Post removido ' })
    }
    catch (err) {
        res.status(400).send(err)
    }
})

app.listen(PORT, () => {
    console.log('Server running on port: ' + PORT)
})