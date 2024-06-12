import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(cookieParser())

// API Routes
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import postRoutes from './routes/post.routes.js'

app.use('/api/v1/auth/',authRoutes)
app.use('/api/v1/user/',userRoutes)
app.use('/api/v1/post/',postRoutes)


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