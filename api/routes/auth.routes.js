import {Router} from 'express'
import { signUp, signIn } from '../controllers/auth.controllers.js'
const router = Router()

router.route('/sign-up').post(signUp)
router.route('/sign-in').post(signIn)

export default router