import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(cookieParser())

// API Routes
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import postRoutes from './routes/post.routes.js'
import commentRoutes from './routes/comment.routes.js'
import path from 'path'

const __dirname = path.resolve()

app.use('/api/v1/auth/',authRoutes)
app.use('/api/v1/user/',userRoutes)
app.use('/api/v1/post/',postRoutes)
app.use('/api/v1/comment/',commentRoutes)

app.use(express.static(path.join(__dirname,'/client/dist')))

app.use("*", (req,res,next) => {
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})

// Global Error middleware
app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    console.log(err)
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})
export {
    app
}