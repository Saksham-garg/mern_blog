import express from 'express'

const app = express()

app.use(express.json())


// API Routes
import authRoutes from './routes/auth.routes.js'
app.use('/api/v1/auth/',authRoutes)


// Global Error middleware
app.use((err,req,res,next) => {
    const statusCode = err.statusCode
    const message = err.message || 'Internal Server Error'

    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})
export {
    app
}