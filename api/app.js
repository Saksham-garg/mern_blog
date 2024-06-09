import express from 'express'
import authRoutes from './routes/auth.routes.js'
const app = express()
app.use(express.json())
console.log(authRoutes)
app.use('/api/v1/auth/',authRoutes)
app.use((err,req,res,next) => {
    return res.status(500).json({ error: err.message });
})
export {
    app
}