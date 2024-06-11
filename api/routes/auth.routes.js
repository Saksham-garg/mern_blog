import {Router} from 'express'
import { signUp, signIn, googleAuth } from '../controllers/auth.controllers.js'
const router = Router()

router.route('/sign-up').post(signUp)
router.route('/google').post(googleAuth)
router.route('/sign-in').post(signIn)

export default router