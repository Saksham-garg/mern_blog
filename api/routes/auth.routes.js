import {Router} from 'express'
import { signUp } from '../controllers/auth.controllers.js'
const router = Router()

router.route('/sign-up').post(signUp)

router.route('/dummy').get((req,res) => {
    return res.status(200).json({
        'sam':'babu'
    })
})
export default router